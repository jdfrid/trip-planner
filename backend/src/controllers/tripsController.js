const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    res.json(db.data.user_trips || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

exports.getById = (req, res) => {
  try {
    const trip = db.data.user_trips.find(t => t.id === req.params.id);
    if (!trip) return res.status(404).json({ error: 'Not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
};

exports.create = (req, res) => {
  try {
    const newTrip = { id: uuidv4(), ...req.body, created_at: new Date().toISOString() };
    db.data.user_trips.push(newTrip);
    db.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

exports.update = (req, res) => {
  try {
    const index = db.data.user_trips.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    db.data.user_trips[index] = { ...db.data.user_trips[index], ...req.body };
    db.save();
    res.json(db.data.user_trips[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

exports.delete = (req, res) => {
  try {
    db.data.user_trips = db.data.user_trips.filter(t => t.id !== req.params.id);
    db.save();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
