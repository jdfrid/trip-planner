const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    res.json(db.data.car_rentals || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car rentals' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const cars = db.data.car_rentals.filter(c => c.destination_id === req.params.destinationId);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car rentals' });
  }
};

exports.getById = (req, res) => {
  try {
    const car = db.data.car_rentals.find(c => c.id === req.params.id);
    if (!car) return res.status(404).json({ error: 'Not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car rental' });
  }
};

exports.create = (req, res) => {
  try {
    const newCar = { id: uuidv4(), ...req.body };
    db.data.car_rentals.push(newCar);
    db.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

exports.update = (req, res) => {
  try {
    const index = db.data.car_rentals.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    db.data.car_rentals[index] = { ...db.data.car_rentals[index], ...req.body };
    db.save();
    res.json(db.data.car_rentals[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

exports.delete = (req, res) => {
  try {
    db.data.car_rentals = db.data.car_rentals.filter(c => c.id !== req.params.id);
    db.save();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
