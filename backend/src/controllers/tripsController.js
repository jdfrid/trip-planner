const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const parseJSON = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return str;
  }
};

const formatTrip = (trip) => ({
  ...trip,
  attractions: parseJSON(trip.attractions)
});

exports.getAll = (req, res) => {
  try {
    const { session_id, status } = req.query;
    let query = `
      SELECT t.*, 
        d.name as destination_name, d.image_url as destination_image,
        f.airline, f.price_economy as flight_price,
        h.name as hotel_name, h.price_per_night as hotel_price,
        c.company as car_company, c.price_per_day as car_price
      FROM user_trips t 
      LEFT JOIN destinations d ON t.destination_id = d.id
      LEFT JOIN flights f ON t.flight_id = f.id
      LEFT JOIN hotels h ON t.hotel_id = h.id
      LEFT JOIN car_rentals c ON t.car_rental_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (session_id) {
      query += ' AND t.session_id = ?';
      params.push(session_id);
    }
    if (status) {
      query += ' AND t.status = ?';
      params.push(status);
    }

    query += ' ORDER BY t.created_at DESC';

    const trips = db.prepare(query).all(...params);
    res.json(trips.map(formatTrip));
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

exports.getById = (req, res) => {
  try {
    const trip = db.prepare(`
      SELECT t.*, 
        d.name as destination_name, d.image_url as destination_image, d.description as destination_description,
        f.airline, f.price_economy as flight_price, f.departure_time, f.arrival_time,
        h.name as hotel_name, h.price_per_night as hotel_price, h.stars, h.address as hotel_address,
        c.company as car_company, c.price_per_day as car_price, c.car_model
      FROM user_trips t 
      LEFT JOIN destinations d ON t.destination_id = d.id
      LEFT JOIN flights f ON t.flight_id = f.id
      LEFT JOIN hotels h ON t.hotel_id = h.id
      LEFT JOIN car_rentals c ON t.car_rental_id = c.id
      WHERE t.id = ?
    `).get(req.params.id);
    
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Get attraction details
    const attractionIds = parseJSON(trip.attractions) || [];
    let attractions = [];
    if (attractionIds.length > 0) {
      const placeholders = attractionIds.map(() => '?').join(',');
      attractions = db.prepare(`SELECT * FROM attractions WHERE id IN (${placeholders})`).all(...attractionIds);
    }

    res.json({
      ...formatTrip(trip),
      attractionDetails: attractions
    });
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
};

exports.create = (req, res) => {
  try {
    const id = uuidv4();
    const {
      session_id, destination_id, flight_id, hotel_id, car_rental_id,
      attractions, start_date, end_date, travelers_count, total_price,
      currency, status, notes
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO user_trips (
        id, session_id, destination_id, flight_id, hotel_id, car_rental_id,
        attractions, start_date, end_date, travelers_count, total_price,
        currency, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, session_id, destination_id, flight_id, hotel_id, car_rental_id,
      JSON.stringify(attractions || []), start_date, end_date, travelers_count || 2,
      total_price, currency || 'ILS', status || 'planning', notes
    );

    const created = db.prepare('SELECT * FROM user_trips WHERE id = ?').get(id);
    res.status(201).json(formatTrip(created));
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
};

exports.update = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM user_trips WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const updates = { ...req.body };
    if (updates.attractions) updates.attractions = JSON.stringify(updates.attractions);
    updates.updated_at = new Date().toISOString();

    const fields = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => updates[key]);

    if (fields) {
      db.prepare(`UPDATE user_trips SET ${fields} WHERE id = ?`).run(...values, req.params.id);
    }

    const updated = db.prepare('SELECT * FROM user_trips WHERE id = ?').get(req.params.id);
    res.json(formatTrip(updated));
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Failed to update trip' });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM user_trips WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    db.prepare('DELETE FROM user_trips WHERE id = ?').run(req.params.id);
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
};

