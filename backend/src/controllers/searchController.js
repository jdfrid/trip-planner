const db = require('../config/database');

// Simple keyword extraction for natural language search
const extractKeywords = (text) => {
  const keywords = {
    destinations: [],
    tripTypes: [],
    budget: null,
    travelers: null,
    duration: null
  };

  const lowerText = text.toLowerCase();

  // Destination keywords
  const destinationMap = {
    'אוסטריה': 'austria', 'austria': 'austria',
    'וינה': 'vienna', 'vienna': 'vienna',
    'זלצבורג': 'salzburg', 'salzburg': 'salzburg',
    'אינסברוק': 'innsbruck', 'innsbruck': 'innsbruck',
    'הלשטאט': 'hallstatt', 'hallstatt': 'hallstatt',
    'אלפים': 'alps', 'alps': 'alps'
  };

  Object.keys(destinationMap).forEach(key => {
    if (lowerText.includes(key)) {
      keywords.destinations.push(destinationMap[key]);
    }
  });

  // Trip type keywords
  const tripTypeMap = {
    'סקי': 'ski', 'ski': 'ski', 'skiing': 'ski',
    'רומנטי': 'romantic', 'romantic': 'romantic', 'זוגי': 'romantic',
    'משפחה': 'family', 'family': 'family', 'משפחתי': 'family', 'ילדים': 'family',
    'הרפתקה': 'adventure', 'adventure': 'adventure',
    'תרבות': 'culture', 'culture': 'culture', 'מוזיאון': 'culture', 'היסטוריה': 'culture',
    'טבע': 'nature', 'nature': 'nature', 'הרים': 'nature',
    'יוקרה': 'luxury', 'luxury': 'luxury', 'פינוק': 'luxury'
  };

  Object.keys(tripTypeMap).forEach(key => {
    if (lowerText.includes(key)) {
      keywords.tripTypes.push(tripTypeMap[key]);
    }
  });

  // Budget extraction
  const budgetMatch = text.match(/(\d{1,3}[,.]?\d{3})\s*(שקל|ש"ח|₪|ils|eur|euro|€)?/i);
  if (budgetMatch) {
    keywords.budget = parseInt(budgetMatch[1].replace(/[,.]/, ''));
  }

  // Travelers extraction
  const travelersMatch = text.match(/(\d+)\s*(אנשים|נוסעים|people|travelers|persons)/i);
  if (travelersMatch) {
    keywords.travelers = parseInt(travelersMatch[1]);
  }

  // Duration extraction
  const durationMatch = text.match(/(\d+)\s*(ימים|לילות|days|nights)/i);
  if (durationMatch) {
    keywords.duration = parseInt(durationMatch[1]);
  }

  return keywords;
};

exports.search = (req, res) => {
  try {
    const { query, filters } = req.body;
    const results = {
      destinations: [],
      packages: [],
      flights: [],
      hotels: [],
      attractions: []
    };

    // Extract keywords from natural language query
    const keywords = query ? extractKeywords(query) : {};

    // Merge with explicit filters
    const searchFilters = {
      ...keywords,
      ...(filters || {})
    };

    // Search destinations
    let destQuery = 'SELECT * FROM destinations WHERE 1=1';
    const destParams = [];

    if (searchFilters.destinations && searchFilters.destinations.length > 0) {
      const placeholders = searchFilters.destinations.map(() => 'LOWER(name) LIKE ? OR LOWER(country) LIKE ? OR LOWER(tags) LIKE ?').join(' OR ');
      destQuery += ` AND (${placeholders})`;
      searchFilters.destinations.forEach(d => {
        destParams.push(`%${d}%`, `%${d}%`, `%${d}%`);
      });
    }

    results.destinations = db.prepare(destQuery).all(...destParams);

    // If we found destinations, search related content
    if (results.destinations.length > 0) {
      const destIds = results.destinations.map(d => d.id);
      const destPlaceholders = destIds.map(() => '?').join(',');

      // Search packages
      let pkgQuery = `SELECT * FROM trip_packages WHERE destination_id IN (${destPlaceholders})`;
      const pkgParams = [...destIds];

      if (searchFilters.tripTypes && searchFilters.tripTypes.length > 0) {
        pkgQuery += ' AND (';
        pkgQuery += searchFilters.tripTypes.map(() => 'trip_type LIKE ?').join(' OR ');
        pkgQuery += ')';
        searchFilters.tripTypes.forEach(t => pkgParams.push(`%${t}%`));
      }

      if (searchFilters.budget) {
        pkgQuery += ' AND price_from <= ?';
        pkgParams.push(searchFilters.budget);
      }

      if (searchFilters.duration) {
        pkgQuery += ' AND duration_days <= ?';
        pkgParams.push(searchFilters.duration);
      }

      results.packages = db.prepare(pkgQuery).all(...pkgParams);

      // Search flights
      results.flights = db.prepare(`
        SELECT * FROM flights WHERE destination_id IN (${destPlaceholders}) ORDER BY price_economy
      `).all(...destIds);

      // Search hotels
      let hotelQuery = `SELECT * FROM hotels WHERE destination_id IN (${destPlaceholders})`;
      const hotelParams = [...destIds];

      if (searchFilters.budget) {
        hotelQuery += ' AND price_per_night <= ?';
        hotelParams.push(searchFilters.budget / 7); // Rough estimate per night
      }

      hotelQuery += ' ORDER BY rating DESC';
      results.hotels = db.prepare(hotelQuery).all(...hotelParams);

      // Search attractions
      let attrQuery = `SELECT * FROM attractions WHERE destination_id IN (${destPlaceholders})`;
      const attrParams = [...destIds];

      if (searchFilters.tripTypes && searchFilters.tripTypes.length > 0) {
        attrQuery += ' AND (';
        attrQuery += searchFilters.tripTypes.map(() => 'type LIKE ? OR tags LIKE ?').join(' OR ');
        attrQuery += ')';
        searchFilters.tripTypes.forEach(t => {
          attrParams.push(`%${t}%`, `%${t}%`);
        });
      }

      attrQuery += ' ORDER BY rating DESC';
      results.attractions = db.prepare(attrQuery).all(...attrParams);
    }

    res.json({
      query,
      parsedKeywords: keywords,
      filters: searchFilters,
      results
    });
  } catch (error) {
    console.error('Error in search:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

exports.getSuggestions = (req, res) => {
  try {
    const destinations = db.prepare('SELECT id, name, name_he, country, image_url FROM destinations LIMIT 10').all();
    const tripTypes = ['ski', 'romantic', 'family', 'adventure', 'culture', 'nature', 'luxury'];
    
    res.json({
      destinations,
      tripTypes,
      sampleQueries: [
        'חופשת סקי באוסטריה למשפחה',
        'טיול רומנטי לוינה',
        'הרפתקה באלפים',
        'חופשה תרבותית בזלצבורג',
        'Austria family vacation under 10000 ILS'
      ]
    });
  } catch (error) {
    console.error('Error getting suggestions:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
};

