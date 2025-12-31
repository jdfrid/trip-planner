const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const formatCarRental = (car) => ({
  ...car,
  ac_included: Boolean(car.ac_included),
  gps_included: Boolean(car.gps_included),
  insurance_included: Boolean(car.insurance_included),
  unlimited_mileage: Boolean(car.unlimited_mileage)
});

exports.getAll = (req, res) => {
  try {
    const carRentals = db.prepare(`
      SELECT c.*, d.name as destination_name 
      FROM car_rentals c 
      LEFT JOIN destinations d ON c.destination_id = d.id 
      ORDER BY c.price_per_day
    `).all();
    res.json(carRentals.map(formatCarRental));
  } catch (error) {
    console.error('Error fetching car rentals:', error);
    res.status(500).json({ error: 'Failed to fetch car rentals' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const carRentals = db.prepare(`
      SELECT * FROM car_rentals WHERE destination_id = ? ORDER BY price_per_day
    `).all(req.params.destinationId);
    res.json(carRentals.map(formatCarRental));
  } catch (error) {
    console.error('Error fetching car rentals:', error);
    res.status(500).json({ error: 'Failed to fetch car rentals' });
  }
};

exports.getById = (req, res) => {
  try {
    const carRental = db.prepare('SELECT * FROM car_rentals WHERE id = ?').get(req.params.id);
    if (!carRental) {
      return res.status(404).json({ error: 'Car rental not found' });
    }
    res.json(formatCarRental(carRental));
  } catch (error) {
    console.error('Error fetching car rental:', error);
    res.status(500).json({ error: 'Failed to fetch car rental' });
  }
};

exports.create = (req, res) => {
  try {
    const id = uuidv4();
    const {
      company, company_logo, destination_id, city, car_type, car_model,
      car_image, seats, transmission, fuel_type, ac_included, gps_included,
      price_per_day, currency, insurance_included, unlimited_mileage,
      pickup_location, booking_url
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO car_rentals (
        id, company, company_logo, destination_id, city, car_type, car_model,
        car_image, seats, transmission, fuel_type, ac_included, gps_included,
        price_per_day, currency, insurance_included, unlimited_mileage,
        pickup_location, booking_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, company, company_logo, destination_id, city, car_type, car_model,
      car_image, seats, transmission, fuel_type, ac_included ? 1 : 0, gps_included ? 1 : 0,
      price_per_day, currency || 'ILS', insurance_included ? 1 : 0, unlimited_mileage ? 1 : 0,
      pickup_location, booking_url
    );

    const created = db.prepare('SELECT * FROM car_rentals WHERE id = ?').get(id);
    res.status(201).json(formatCarRental(created));
  } catch (error) {
    console.error('Error creating car rental:', error);
    res.status(500).json({ error: 'Failed to create car rental' });
  }
};

exports.update = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM car_rentals WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Car rental not found' });
    }

    const updates = { ...req.body };
    const boolFields = ['ac_included', 'gps_included', 'insurance_included', 'unlimited_mileage'];
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
      db.prepare(`UPDATE car_rentals SET ${fields} WHERE id = ?`).run(...values, req.params.id);
    }

    const updated = db.prepare('SELECT * FROM car_rentals WHERE id = ?').get(req.params.id);
    res.json(formatCarRental(updated));
  } catch (error) {
    console.error('Error updating car rental:', error);
    res.status(500).json({ error: 'Failed to update car rental' });
  }
};

exports.delete = (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM car_rentals WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Car rental not found' });
    }

    db.prepare('DELETE FROM car_rentals WHERE id = ?').run(req.params.id);
    res.json({ message: 'Car rental deleted successfully' });
  } catch (error) {
    console.error('Error deleting car rental:', error);
    res.status(500).json({ error: 'Failed to delete car rental' });
  }
};

