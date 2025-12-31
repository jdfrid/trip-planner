const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    res.json(db.data.hotels || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

exports.getByDestination = (req, res) => {
  try {
    const hotels = db.data.hotels.filter(h => h.destination_id === req.params.destinationId);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

exports.getById = (req, res) => {
  try {
    const hotel = db.data.hotels.find(h => h.id === req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Not found' });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
};

exports.create = (req, res) => {
  try {
    const newHotel = { id: uuidv4(), ...req.body };
    db.data.hotels.push(newHotel);
    db.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

exports.update = (req, res) => {
  try {
    const index = db.data.hotels.findIndex(h => h.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    db.data.hotels[index] = { ...db.data.hotels[index], ...req.body };
    db.save();
    res.json(db.data.hotels[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

exports.delete = (req, res) => {
  try {
    db.data.hotels = db.data.hotels.filter(h => h.id !== req.params.id);
    db.save();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
