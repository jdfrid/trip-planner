const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    res.json(db.data.destinations || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
};

exports.getById = (req, res) => {
  try {
    const dest = db.data.destinations.find(d => d.id === req.params.id);
    if (!dest) return res.status(404).json({ error: 'Not found' });
    res.json(dest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
};

exports.getComplete = (req, res) => {
  try {
    const destination = db.data.destinations.find(d => d.id === req.params.id);
    if (!destination) return res.status(404).json({ error: 'Not found' });

    res.json({
      destination,
      flights: db.data.flights.filter(f => f.destination_id === req.params.id),
      hotels: db.data.hotels.filter(h => h.destination_id === req.params.id),
      carRentals: db.data.car_rentals.filter(c => c.destination_id === req.params.id),
      attractions: db.data.attractions.filter(a => a.destination_id === req.params.id),
      packages: db.data.trip_packages.filter(p => p.destination_id === req.params.id)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.create = (req, res) => {
  try {
    const newDest = { id: uuidv4(), ...req.body, created_at: new Date().toISOString() };
    db.data.destinations.push(newDest);
    db.save();
    res.status(201).json(newDest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

exports.update = (req, res) => {
  try {
    const index = db.data.destinations.findIndex(d => d.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    db.data.destinations[index] = { ...db.data.destinations[index], ...req.body };
    db.save();
    res.json(db.data.destinations[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

exports.delete = (req, res) => {
  try {
    db.data.destinations = db.data.destinations.filter(d => d.id !== req.params.id);
    db.save();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
