const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const parseJSON = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return str;
  }
};

const formatDestination = (dest) => ({
  ...dest,
  gallery: parseJSON(dest.gallery),
  tags: parseJSON(dest.tags),
  visa_required: Boolean(dest.visa_required)
});

exports.getAll = (req, res) => {
  try {
    const destinations = db.prepare('SELECT * FROM destinations ORDER BY name').all();
    res.json(destinations.map(formatDestination));
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
};

exports.getById = (req, res) => {
  try {
    const destination = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(formatDestination(destination));
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
};

exports.getComplete = (req, res) => {
  try {
    const destination = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const flights = db.prepare('SELECT * FROM flights WHERE destination_id = ?').all(req.params.id);
    const hotels = db.prepare('SELECT * FROM hotels WHERE destination_id = ?').all(req.params.id);
    const carRentals = db.prepare('SELECT * FROM car_rentals WHERE destination_id = ?').all(req.params.id);
    const attractions = db.prepare('SELECT * FROM attractions WHERE destination_id = ?').all(req.params.id);
    const packages = db.prepare('SELECT * FROM trip_packages WHERE destination_id = ?').all(req.params.id);

    res.json({
      destination: formatDestination(destination),
      flights,
      hotels: hotels.map(h => ({
        ...h,
        gallery: parseJSON(h.gallery),
        amenities: parseJSON(h.amenities)
      })),
      carRentals,
      attractions: attractions.map(a => ({
        ...a,
        gallery: parseJSON(a.gallery),
        tags: parseJSON(a.tags)
      })),
      packages: packages.map(p => ({
        ...p,
        highlights: parseJSON(p.highlights),
        itinerary: parseJSON(p.itinerary)
      }))
    });
  } catch (error) {
    console.error('Error fetching complete destination:', error);
    res.status(500).json({ error: 'Failed to fetch complete destination data' });
  }
};

exports.create = (req, res) => {
  try {
    const id = uuidv4();
    const {
      name, name_he, country, country_he, description, description_he,
      image_url, gallery, best_season, avg_temp_summer, avg_temp_winter,
      currency, language, timezone, visa_required, tags, latitude, longitude
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO destinations (
        id, name, name_he, country, country_he, description, description_he,
        image_url, gallery, best_season, avg_temp_summer, avg_temp_winter,
        currency, language, timezone, visa_required, tags, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, name, name_he, country, country_he, description, description_he,
      image_url, JSON.stringify(gallery), best_season, avg_temp_summer, avg_temp_winter,
      currency, language, timezone, visa_required ? 1 : 0, JSON.stringify(tags), latitude, longitude
    );

    const created = db.prepare('SELECT * FROM destinations WHERE id = ?').get(id);
    res.status(201).json(formatDestination(created));
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ error: 'Failed to create destination' });
  }
};

exports.update = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const {
      name, name_he, country, country_he, description, description_he,
      image_url, gallery, best_season, avg_temp_summer, avg_temp_winter,
      currency, language, timezone, visa_required, tags, latitude, longitude
    } = req.body;

    const stmt = db.prepare(`
      UPDATE destinations SET
        name = COALESCE(?, name),
        name_he = COALESCE(?, name_he),
        country = COALESCE(?, country),
        country_he = COALESCE(?, country_he),
        description = COALESCE(?, description),
        description_he = COALESCE(?, description_he),
        image_url = COALESCE(?, image_url),
        gallery = COALESCE(?, gallery),
        best_season = COALESCE(?, best_season),
        avg_temp_summer = COALESCE(?, avg_temp_summer),
        avg_temp_winter = COALESCE(?, avg_temp_winter),
        currency = COALESCE(?, currency),
        language = COALESCE(?, language),
        timezone = COALESCE(?, timezone),
        visa_required = COALESCE(?, visa_required),
        tags = COALESCE(?, tags),
        latitude = COALESCE(?, latitude),
        longitude = COALESCE(?, longitude),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      name, name_he, country, country_he, description, description_he,
      image_url, gallery ? JSON.stringify(gallery) : null, best_season, avg_temp_summer, avg_temp_winter,
      currency, language, timezone, visa_required !== undefined ? (visa_required ? 1 : 0) : null,
      tags ? JSON.stringify(tags) : null, latitude, longitude, req.params.id
    );

    const updated = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
    res.json(formatDestination(updated));
  } catch (error) {
    console.error('Error updating destination:', error);
    res.status(500).json({ error: 'Failed to update destination' });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    db.prepare('DELETE FROM destinations WHERE id = ?').run(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ error: 'Failed to delete destination' });
  }
};

