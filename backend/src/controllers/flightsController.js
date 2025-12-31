const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    res.json(db.data.flights || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const flights = db.data.flights.filter(f => f.destination_id === req.params.destinationId);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

exports.getById = (req, res) => {
  try {
    const flight = db.data.flights.find(f => f.id === req.params.id);
    if (!flight) return res.status(404).json({ error: 'Not found' });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flight' });
  }
};

exports.create = (req, res) => {
  try {
    const newFlight = { id: uuidv4(), ...req.body };
    db.data.flights.push(newFlight);
    db.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

exports.update = (req, res) => {
  try {
    const index = db.data.flights.findIndex(f => f.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    db.data.flights[index] = { ...db.data.flights[index], ...req.body };
    db.save();
    res.json(db.data.flights[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

exports.delete = (req, res) => {
  try {
    db.data.flights = db.data.flights.filter(f => f.id !== req.params.id);
    db.save();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
