const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const parseJSON = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return str;
  }
};

const formatPackage = (pkg) => ({
  ...pkg,
  highlights: parseJSON(pkg.highlights),
  itinerary: parseJSON(pkg.itinerary),
  includes_flight: Boolean(pkg.includes_flight),
  includes_hotel: Boolean(pkg.includes_hotel),
  includes_car: Boolean(pkg.includes_car),
  includes_attractions: Boolean(pkg.includes_attractions)
});

exports.getAll = (req, res) => {
  try {
    const { trip_type, suitable_for } = req.query;
    let query = `
      SELECT p.*, d.name as destination_name, d.image_url as destination_image
      FROM trip_packages p 
      LEFT JOIN destinations d ON p.destination_id = d.id 
      WHERE 1=1
    `;
    const params = [];

    if (trip_type) {
      query += ' AND p.trip_type = ?';
      params.push(trip_type);
    }
    if (suitable_for) {
      query += ' AND p.suitable_for LIKE ?';
      params.push(`%${suitable_for}%`);
    }

    query += ' ORDER BY p.price_from';

    const packages = db.prepare(query).all(...params);
    res.json(packages.map(formatPackage));
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const packages = db.prepare(`
      SELECT * FROM trip_packages WHERE destination_id = ? ORDER BY price_from
    `).all(req.params.destinationId);
    res.json(packages.map(formatPackage));
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};

exports.getById = (req, res) => {
  try {
    const pkg = db.prepare('SELECT * FROM trip_packages WHERE id = ?').get(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(formatPackage(pkg));
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ error: 'Failed to fetch package' });
  }
};

exports.create = (req, res) => {
  try {
    const id = uuidv4();
    const {
      name, name_he, destination_id, description, description_he, duration_days,
      image_url, price_from, currency, includes_flight, includes_hotel,
      includes_car, includes_attractions, trip_type, suitable_for, highlights, itinerary
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO trip_packages (
        id, name, name_he, destination_id, description, description_he, duration_days,
        image_url, price_from, currency, includes_flight, includes_hotel,
        includes_car, includes_attractions, trip_type, suitable_for, highlights, itinerary
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, name, name_he, destination_id, description, description_he, duration_days,
      image_url, price_from, currency || 'ILS', includes_flight ? 1 : 0, includes_hotel ? 1 : 0,
      includes_car ? 1 : 0, includes_attractions ? 1 : 0, trip_type, suitable_for,
      JSON.stringify(highlights), JSON.stringify(itinerary)
    );

    const created = db.prepare('SELECT * FROM trip_packages WHERE id = ?').get(id);
    res.status(201).json(formatPackage(created));
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ error: 'Failed to create package' });
  }
};

exports.update = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM trip_packages WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const updates = { ...req.body };
    if (updates.highlights) updates.highlights = JSON.stringify(updates.highlights);
    if (updates.itinerary) updates.itinerary = JSON.stringify(updates.itinerary);
    const boolFields = ['includes_flight', 'includes_hotel', 'includes_car', 'includes_attractions'];
    boolFields.forEach(field => {
      if (updates[field] !== undefined) updates[field] = updates[field] ? 1 : 0;
    });

    const fields = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map(key => updates[key]);

    if (fields) {
      db.prepare(`UPDATE trip_packages SET ${fields} WHERE id = ?`).run(...values, req.params.id);
    }

    const updated = db.prepare('SELECT * FROM trip_packages WHERE id = ?').get(req.params.id);
    res.json(formatPackage(updated));
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'Failed to update package' });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM trip_packages WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Package not found' });
    }

    db.prepare('DELETE FROM trip_packages WHERE id = ?').run(req.params.id);
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ error: 'Failed to delete package' });
  }
};

