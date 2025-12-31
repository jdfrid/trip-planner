const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const parseJSON = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return str;
  }
};

const formatAttraction = (attr) => ({
  ...attr,
  gallery: parseJSON(attr.gallery),
  tags: parseJSON(attr.tags),
  booking_required: Boolean(attr.booking_required)
});

exports.getAll = (req, res) => {
  try {
    const { type, city } = req.query;
    let query = `
      SELECT a.*, d.name as destination_name 
      FROM attractions a 
      LEFT JOIN destinations d ON a.destination_id = d.id 
      WHERE 1=1
    `;
    const params = [];

    if (type) {
      query += ' AND a.type = ?';
      params.push(type);
    }
    if (city) {
      query += ' AND a.city = ?';
      params.push(city);
    }

    query += ' ORDER BY a.rating DESC';

    const attractions = db.prepare(query).all(...params);
    res.json(attractions.map(formatAttraction));
  } catch (error) {
    console.error('Error fetching attractions:', error);
    res.status(500).json({ error: 'Failed to fetch attractions' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const attractions = db.prepare(`
      SELECT * FROM attractions WHERE destination_id = ? ORDER BY rating DESC
    `).all(req.params.destinationId);
    res.json(attractions.map(formatAttraction));
  } catch (error) {
    console.error('Error fetching attractions:', error);
    res.status(500).json({ error: 'Failed to fetch attractions' });
  }
};

exports.getById = (req, res) => {
  try {
    const attraction = db.prepare('SELECT * FROM attractions WHERE id = ?').get(req.params.id);
    if (!attraction) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json(formatAttraction(attraction));
  } catch (error) {
    console.error('Error fetching attraction:', error);
    res.status(500).json({ error: 'Failed to fetch attraction' });
  }
};

exports.create = (req, res) => {
  try {
    const id = uuidv4();
    const {
      name, name_he, destination_id, city, type, description, description_he,
      image_url, gallery, duration_hours, price, currency, rating, reviews_count,
      opening_hours, address, booking_required, booking_url, tips, tags,
      latitude, longitude
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO attractions (
        id, name, name_he, destination_id, city, type, description, description_he,
        image_url, gallery, duration_hours, price, currency, rating, reviews_count,
        opening_hours, address, booking_required, booking_url, tips, tags,
        latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, name, name_he, destination_id, city, type, description, description_he,
      image_url, JSON.stringify(gallery), duration_hours, price, currency || 'EUR',
      rating, reviews_count || 0, opening_hours, address, booking_required ? 1 : 0,
      booking_url, tips, JSON.stringify(tags), latitude, longitude
    );

    const created = db.prepare('SELECT * FROM attractions WHERE id = ?').get(id);
    res.status(201).json(formatAttraction(created));
  } catch (error) {
    console.error('Error creating attraction:', error);
    res.status(500).json({ error: 'Failed to create attraction' });
  }
};

exports.update = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM attractions WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Attraction not found' });
    }

    const updates = { ...req.body };
    if (updates.gallery) updates.gallery = JSON.stringify(updates.gallery);
    if (updates.tags) updates.tags = JSON.stringify(updates.tags);
    if (updates.booking_required !== undefined) updates.booking_required = updates.booking_required ? 1 : 0;

    const fields = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => updates[key]);

    if (fields) {
      db.prepare(`UPDATE attractions SET ${fields} WHERE id = ?`).run(...values, req.params.id);
    }

    const updated = db.prepare('SELECT * FROM attractions WHERE id = ?').get(req.params.id);
    res.json(formatAttraction(updated));
  } catch (error) {
    console.error('Error updating attraction:', error);
    res.status(500).json({ error: 'Failed to update attraction' });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM attractions WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Attraction not found' });
    }

    db.prepare('DELETE FROM attractions WHERE id = ?').run(req.params.id);
    res.json({ message: 'Attraction deleted successfully' });
  } catch (error) {
    console.error('Error deleting attraction:', error);
    res.status(500).json({ error: 'Failed to delete attraction' });
  }
};

