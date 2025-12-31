const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    res.json(db.data.attractions || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attractions' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const attractions = db.data.attractions.filter(a => a.destination_id === req.params.destinationId);
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attractions' });
  }
};

exports.getById = (req, res) => {
  try {
    const attraction = db.data.attractions.find(a => a.id === req.params.id);
    if (!attraction) return res.status(404).json({ error: 'Not found' });
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attraction' });
  }
};

exports.create = (req, res) => {
  try {
    const newAttr = { id: uuidv4(), ...req.body };
    db.data.attractions.push(newAttr);
    db.save();
    res.status(201).json(newAttr);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

exports.update = (req, res) => {
  try {
    const index = db.data.attractions.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    db.data.attractions[index] = { ...db.data.attractions[index], ...req.body };
    db.save();
    res.json(db.data.attractions[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

exports.delete = (req, res) => {
  try {
    db.data.attractions = db.data.attractions.filter(a => a.id !== req.params.id);
    db.save();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
