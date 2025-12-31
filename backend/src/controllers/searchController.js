const db = require('../config/database');

exports.search = (req, res) => {
  try {
    const { query } = req.body;
    const lowerQuery = (query || '').toLowerCase();

    // Simple keyword search
    const results = {
      destinations: db.data.destinations.filter(d => 
        d.name?.toLowerCase().includes(lowerQuery) ||
        d.name_he?.includes(query) ||
        d.country?.toLowerCase().includes(lowerQuery)
      ),
      packages: [],
      flights: [],
      hotels: [],
      attractions: []
    };

    // If we found destinations, get related data
    if (results.destinations.length > 0) {
      const destIds = results.destinations.map(d => d.id);
      
      results.packages = db.data.trip_packages.filter(p => destIds.includes(p.destination_id));
      results.flights = db.data.flights.filter(f => destIds.includes(f.destination_id));
      results.hotels = db.data.hotels.filter(h => destIds.includes(h.destination_id));
      results.attractions = db.data.attractions.filter(a => destIds.includes(a.destination_id));
    } else {
      // Return all data if no specific destination found
      results.destinations = db.data.destinations;
      results.packages = db.data.trip_packages;
      results.flights = db.data.flights;
      results.hotels = db.data.hotels;
      results.attractions = db.data.attractions;
    }

    res.json({ query, results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

exports.getSuggestions = (req, res) => {
  try {
    res.json({
      destinations: db.data.destinations.map(d => ({ id: d.id, name: d.name, name_he: d.name_he })),
      tripTypes: ['culture', 'adventure', 'romantic', 'family'],
      sampleQueries: ['חופשת סקי באוסטריה', 'טיול רומנטי לוינה', 'Austria family vacation']
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};
