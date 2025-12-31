const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    res.json(db.data.trip_packages || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const packages = db.data.trip_packages.filter(p => p.destination_id === req.params.destinationId);
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};

exports.getById = (req, res) => {
  try {
    const pkg = db.data.trip_packages.find(p => p.id === req.params.id);
    if (!pkg) return res.status(404).json({ error: 'Not found' });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch package' });
  }
};

exports.create = (req, res) => {
  try {
    const newPkg = { id: uuidv4(), ...req.body };
    db.data.trip_packages.push(newPkg);
    db.save();
    res.status(201).json(newPkg);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

exports.update = (req, res) => {
  try {
    const index = db.data.trip_packages.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    db.data.trip_packages[index] = { ...db.data.trip_packages[index], ...req.body };
    db.save();
    res.json(db.data.trip_packages[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

exports.delete = (req, res) => {
  try {
    db.data.trip_packages = db.data.trip_packages.filter(p => p.id !== req.params.id);
    db.save();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
