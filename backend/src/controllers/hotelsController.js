const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const parseJSON = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return str;
  }
};

const formatHotel = (hotel) => ({
  ...hotel,
  gallery: parseJSON(hotel.gallery),
  amenities: parseJSON(hotel.amenities),
  breakfast_included: Boolean(hotel.breakfast_included),
  free_cancellation: Boolean(hotel.free_cancellation)
});

exports.getAll = (req, res) => {
  try {
    const hotels = db.prepare(`
      SELECT h.*, d.name as destination_name 
      FROM hotels h 
      LEFT JOIN destinations d ON h.destination_id = d.id 
      ORDER BY h.rating DESC
    `).all();
    res.json(hotels.map(formatHotel));
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const hotels = db.prepare(`
      SELECT * FROM hotels WHERE destination_id = ? ORDER BY rating DESC
    `).all(req.params.destinationId);
    res.json(hotels.map(formatHotel));
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

exports.getById = (req, res) => {
  try {
    const hotel = db.prepare('SELECT * FROM hotels WHERE id = ?').get(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(formatHotel(hotel));
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
};

exports.create = (req, res) => {
  try {
    const id = uuidv4();
    const {
      name, destination_id, city, address, stars, rating, reviews_count,
      description, description_he, image_url, gallery, amenities,
      price_per_night, currency, breakfast_included, free_cancellation,
      booking_url, latitude, longitude
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO hotels (
        id, name, destination_id, city, address, stars, rating, reviews_count,
        description, description_he, image_url, gallery, amenities,
        price_per_night, currency, breakfast_included, free_cancellation,
        booking_url, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, name, destination_id, city, address, stars, rating, reviews_count || 0,
      description, description_he, image_url, JSON.stringify(gallery), JSON.stringify(amenities),
      price_per_night, currency || 'ILS', breakfast_included ? 1 : 0, free_cancellation ? 1 : 0,
      booking_url, latitude, longitude
    );

    const created = db.prepare('SELECT * FROM hotels WHERE id = ?').get(id);
    res.status(201).json(formatHotel(created));
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ error: 'Failed to create hotel' });
  }
};

exports.update = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM hotels WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const updates = { ...req.body };
    if (updates.gallery) updates.gallery = JSON.stringify(updates.gallery);
    if (updates.amenities) updates.amenities = JSON.stringify(updates.amenities);
    if (updates.breakfast_included !== undefined) updates.breakfast_included = updates.breakfast_included ? 1 : 0;
    if (updates.free_cancellation !== undefined) updates.free_cancellation = updates.free_cancellation ? 1 : 0;

    const fields = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => updates[key]);

    if (fields) {
      db.prepare(`UPDATE hotels SET ${fields} WHERE id = ?`).run(...values, req.params.id);
    }

    const updated = db.prepare('SELECT * FROM hotels WHERE id = ?').get(req.params.id);
    res.json(formatHotel(updated));
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ error: 'Failed to update hotel' });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM hotels WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    db.prepare('DELETE FROM hotels WHERE id = ?').run(req.params.id);
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ error: 'Failed to delete hotel' });
  }
};

