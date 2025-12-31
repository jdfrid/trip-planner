const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    const flights = db.prepare(`
      SELECT f.*, d.name as destination_name 
      FROM flights f 
      LEFT JOIN destinations d ON f.destination_id = d.id 
      ORDER BY f.price_economy
    `).all();
    res.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const flights = db.prepare(`
      SELECT * FROM flights WHERE destination_id = ? ORDER BY price_economy
    `).all(req.params.destinationId);
    res.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

exports.getById = (req, res) => {
  try {
    const flight = db.prepare('SELECT * FROM flights WHERE id = ?').get(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    console.error('Error fetching flight:', error);
    res.status(500).json({ error: 'Failed to fetch flight' });
  }
};

exports.create = (req, res) => {
  try {
    const id = uuidv4();
    const {
      airline, airline_logo, origin, origin_code, destination_id, destination,
      destination_code, departure_time, arrival_time, duration_minutes,
      price_economy, price_business, currency, stops, baggage_included,
      meal_included, booking_url
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO flights (
        id, airline, airline_logo, origin, origin_code, destination_id, destination,
        destination_code, departure_time, arrival_time, duration_minutes,
        price_economy, price_business, currency, stops, baggage_included,
        meal_included, booking_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, airline, airline_logo, origin, origin_code, destination_id, destination,
      destination_code, departure_time, arrival_time, duration_minutes,
      price_economy, price_business, currency || 'ILS', stops || 0,
      baggage_included ? 1 : 0, meal_included ? 1 : 0, booking_url
    );

    const created = db.prepare('SELECT * FROM flights WHERE id = ?').get(id);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ error: 'Failed to create flight' });
  }
};

exports.update = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM flights WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    const fields = Object.keys(req.body)
      .filter(key => req.body[key] !== undefined)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.keys(req.body)
      .filter(key => req.body[key] !== undefined)
      .map(key => {
        if (typeof req.body[key] === 'boolean') return req.body[key] ? 1 : 0;
        return req.body[key];
      });

    if (fields) {
      db.prepare(`UPDATE flights SET ${fields} WHERE id = ?`).run(...values, req.params.id);
    }

    const updated = db.prepare('SELECT * FROM flights WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ error: 'Failed to update flight' });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM flights WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    db.prepare('DELETE FROM flights WHERE id = ?').run(req.params.id);
    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ error: 'Failed to delete flight' });
  }
};

