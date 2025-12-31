const express = require('express');
const router = express.Router();

const destinationsController = require('../controllers/destinationsController');
const flightsController = require('../controllers/flightsController');
const hotelsController = require('../controllers/hotelsController');
const carRentalsController = require('../controllers/carRentalsController');
const attractionsController = require('../controllers/attractionsController');
const packagesController = require('../controllers/packagesController');
const tripsController = require('../controllers/tripsController');
const searchController = require('../controllers/searchController');

// Destinations
router.get('/destinations', destinationsController.getAll);
router.get('/destinations/:id', destinationsController.getById);
router.post('/destinations', destinationsController.create);
router.put('/destinations/:id', destinationsController.update);
router.delete('/destinations/:id', destinationsController.delete);

// Flights
router.get('/flights', flightsController.getAll);
router.get('/flights/destination/:destinationId', flightsController.getByDestination);
router.get('/flights/:id', flightsController.getById);
router.post('/flights', flightsController.create);
router.put('/flights/:id', flightsController.update);
router.delete('/flights/:id', flightsController.delete);

// Hotels
router.get('/hotels', hotelsController.getAll);
router.get('/hotels/destination/:destinationId', hotelsController.getByDestination);
router.get('/hotels/:id', hotelsController.getById);
router.post('/hotels', hotelsController.create);
router.put('/hotels/:id', hotelsController.update);
router.delete('/hotels/:id', hotelsController.delete);

// Car Rentals
router.get('/car-rentals', carRentalsController.getAll);
router.get('/car-rentals/destination/:destinationId', carRentalsController.getByDestination);
router.get('/car-rentals/:id', carRentalsController.getById);
router.post('/car-rentals', carRentalsController.create);
router.put('/car-rentals/:id', carRentalsController.update);
router.delete('/car-rentals/:id', carRentalsController.delete);

// Attractions
router.get('/attractions', attractionsController.getAll);
router.get('/attractions/destination/:destinationId', attractionsController.getByDestination);
router.get('/attractions/:id', attractionsController.getById);
router.post('/attractions', attractionsController.create);
router.put('/attractions/:id', attractionsController.update);
router.delete('/attractions/:id', attractionsController.delete);

// Trip Packages
router.get('/packages', packagesController.getAll);
router.get('/packages/destination/:destinationId', packagesController.getByDestination);
router.get('/packages/:id', packagesController.getById);
router.post('/packages', packagesController.create);
router.put('/packages/:id', packagesController.update);
router.delete('/packages/:id', packagesController.delete);

// User Trips
router.get('/trips', tripsController.getAll);
router.get('/trips/:id', tripsController.getById);
router.post('/trips', tripsController.create);
router.put('/trips/:id', tripsController.update);
router.delete('/trips/:id', tripsController.delete);

// Search - Natural language and filters
router.post('/search', searchController.search);
router.get('/search/suggestions', searchController.getSuggestions);

// Get complete trip info (destination with all related data)
router.get('/destinations/:id/complete', destinationsController.getComplete);

module.exports = router;

