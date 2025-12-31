const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataDir = path.join(__dirname, '../../data');
const dbPath = path.join(dataDir, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Austria Demo Data
const AUSTRIA_ID = uuidv4();

const destinations = [
  {
    id: AUSTRIA_ID,
    name: 'Austria',
    name_he: 'אוסטריה',
    country: 'Austria',
    country_he: 'אוסטריה',
    description: 'Austria is a stunning Central European country known for its Imperial palaces, Alpine peaks, and rich musical heritage.',
    description_he: 'אוסטריה היא מדינה מרהיבה במרכז אירופה, ידועה בארמונותיה הקיסריים, פסגות האלפים שלה ומורשת המוזיקה העשירה.',
    image_url: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200',
    gallery: ['https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=800'],
    best_season: 'All year - Winter for skiing, Summer for hiking',
    avg_temp_summer: 25,
    avg_temp_winter: 0,
    currency: 'EUR',
    language: 'German',
    timezone: 'CET (UTC+1)',
    visa_required: false,
    tags: ['alps', 'skiing', 'culture', 'music', 'nature'],
    latitude: 47.5162,
    longitude: 14.5501
  }
];

const flights = [
  {
    id: uuidv4(),
    airline: 'Austrian Airlines',
    airline_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Austrian_Airlines_logo.svg/200px-Austrian_Airlines_logo.svg.png',
    origin: 'Tel Aviv',
    origin_code: 'TLV',
    destination_id: AUSTRIA_ID,
    destination: 'Vienna',
    destination_code: 'VIE',
    departure_time: '08:30',
    arrival_time: '11:45',
    duration_minutes: 255,
    price_economy: 1450,
    price_business: 4200,
    currency: 'ILS',
    stops: 0,
    baggage_included: true,
    meal_included: true
  },
  {
    id: uuidv4(),
    airline: 'EL AL',
    airline_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/El_Al_Israel_Airlines_logo.svg/200px-El_Al_Israel_Airlines_logo.svg.png',
    origin: 'Tel Aviv',
    origin_code: 'TLV',
    destination_id: AUSTRIA_ID,
    destination: 'Vienna',
    destination_code: 'VIE',
    departure_time: '14:15',
    arrival_time: '17:30',
    duration_minutes: 255,
    price_economy: 1680,
    price_business: 5100,
    currency: 'ILS',
    stops: 0,
    baggage_included: true,
    meal_included: true
  },
  {
    id: uuidv4(),
    airline: 'Wizz Air',
    origin: 'Tel Aviv',
    origin_code: 'TLV',
    destination_id: AUSTRIA_ID,
    destination: 'Vienna',
    destination_code: 'VIE',
    departure_time: '06:00',
    arrival_time: '09:15',
    duration_minutes: 255,
    price_economy: 890,
    currency: 'ILS',
    stops: 0,
    baggage_included: false,
    meal_included: false
  }
];

const hotels = [
  {
    id: uuidv4(),
    name: 'Hotel Sacher Wien',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    address: 'Philharmoniker Str. 4, 1010 Wien',
    stars: 5,
    rating: 4.9,
    reviews_count: 2847,
    description: 'The legendary Hotel Sacher Wien is a symbol of Viennese hospitality.',
    description_he: 'מלון סאכר וינה האגדי הוא סמל של האירוח הווינאי.',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    gallery: [],
    amenities: ['Spa', 'Restaurant', 'Bar', 'WiFi', 'Gym'],
    price_per_night: 2100,
    currency: 'ILS',
    breakfast_included: true,
    free_cancellation: true,
    latitude: 48.2039,
    longitude: 16.3695
  },
  {
    id: uuidv4(),
    name: 'Motel One Wien-Staatsoper',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    address: 'Elisabethstraße 5, 1010 Wien',
    stars: 3,
    rating: 4.5,
    reviews_count: 3456,
    description: 'Modern budget-design hotel in perfect location.',
    description_he: 'מלון עיצוב תקציבי מודרני במיקום מושלם.',
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    gallery: [],
    amenities: ['Bar', 'WiFi'],
    price_per_night: 520,
    currency: 'ILS',
    breakfast_included: false,
    free_cancellation: true,
    latitude: 48.2025,
    longitude: 16.3680
  },
  {
    id: uuidv4(),
    name: 'Hotel Goldener Hirsch',
    destination_id: AUSTRIA_ID,
    city: 'Salzburg',
    address: 'Getreidegasse 37, 5020 Salzburg',
    stars: 5,
    rating: 4.8,
    reviews_count: 987,
    description: 'Historic luxury hotel in Salzburg Old Town.',
    description_he: 'מלון יוקרה היסטורי בעיר העתיקה של זלצבורג.',
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    gallery: [],
    amenities: ['Restaurant', 'Bar', 'Concierge', 'WiFi'],
    price_per_night: 1650,
    currency: 'ILS',
    breakfast_included: true,
    free_cancellation: true,
    latitude: 47.7999,
    longitude: 13.0447
  }
];

const car_rentals = [
  {
    id: uuidv4(),
    company: 'Europcar',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    car_type: 'Economy',
    car_model: 'VW Polo',
    seats: 5,
    transmission: 'Manual',
    fuel_type: 'Petrol',
    ac_included: true,
    gps_included: false,
    price_per_day: 180,
    currency: 'ILS',
    insurance_included: true,
    unlimited_mileage: true,
    pickup_location: 'Vienna Airport (VIE)'
  },
  {
    id: uuidv4(),
    company: 'Hertz',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    car_type: 'SUV',
    car_model: 'BMW X3',
    seats: 5,
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    ac_included: true,
    gps_included: true,
    price_per_day: 450,
    currency: 'ILS',
    insurance_included: true,
    unlimited_mileage: true,
    pickup_location: 'Vienna Airport (VIE)'
  }
];

const attractions = [
  {
    id: uuidv4(),
    name: 'Schönbrunn Palace',
    name_he: 'ארמון שנברון',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    type: 'culture',
    description: 'The magnificent summer residence of the Habsburgs.',
    description_he: 'מעונה הקיצי המרהיב של שושלת הבסבורג.',
    image_url: 'https://images.unsplash.com/photo-1609838599411-e5b6d0a8f46a?w=800',
    gallery: [],
    duration_hours: 3,
    price: 24,
    currency: 'EUR',
    rating: 4.8,
    reviews_count: 45678,
    opening_hours: '08:00-17:30',
    address: 'Schönbrunner Schloßstraße 47, 1130 Wien',
    booking_required: true,
    tags: ['palace', 'history', 'gardens', 'UNESCO'],
    latitude: 48.1845,
    longitude: 16.3122
  },
  {
    id: uuidv4(),
    name: 'Vienna State Opera',
    name_he: 'בית האופרה של וינה',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    type: 'culture',
    description: 'One of the world\'s most prestigious opera houses.',
    description_he: 'אחד מבתי האופרה היוקרתיים בעולם.',
    image_url: 'https://images.unsplash.com/photo-1572468831937-1bc8ecb8d33c?w=800',
    gallery: [],
    duration_hours: 3,
    price: 15,
    currency: 'EUR',
    rating: 4.7,
    reviews_count: 12345,
    opening_hours: '19:00-22:00',
    address: 'Opernring 2, 1010 Wien',
    booking_required: true,
    tags: ['opera', 'music', 'culture'],
    latitude: 48.2035,
    longitude: 16.3688
  },
  {
    id: uuidv4(),
    name: 'Hohensalzburg Fortress',
    name_he: 'מבצר הוהנזלצבורג',
    destination_id: AUSTRIA_ID,
    city: 'Salzburg',
    type: 'culture',
    description: 'One of Europe\'s largest medieval castles.',
    description_he: 'אחד הטירות מימי הביניים הגדולות באירופה.',
    image_url: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800',
    gallery: [],
    duration_hours: 2.5,
    price: 16.30,
    currency: 'EUR',
    rating: 4.7,
    reviews_count: 15678,
    opening_hours: '09:30-17:00',
    address: 'Mönchsberg 34, 5020 Salzburg',
    booking_required: false,
    tags: ['castle', 'history', 'views'],
    latitude: 47.7953,
    longitude: 13.0475
  },
  {
    id: uuidv4(),
    name: 'Hallstatt Skywalk',
    name_he: 'סקייווק הלשטאט',
    destination_id: AUSTRIA_ID,
    city: 'Hallstatt',
    type: 'nature',
    description: 'Viewing platform 350m above the village.',
    description_he: 'מצפה תצפית 350 מטר מעל הכפר.',
    image_url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
    gallery: [],
    duration_hours: 2,
    price: 36,
    currency: 'EUR',
    rating: 4.7,
    reviews_count: 4567,
    opening_hours: '09:30-16:00',
    address: 'Salzbergstraße 21, 4830 Hallstatt',
    booking_required: false,
    tags: ['nature', 'views', 'UNESCO'],
    latitude: 47.5548,
    longitude: 13.6454
  }
];

const trip_packages = [
  {
    id: uuidv4(),
    name: 'Vienna Cultural Experience',
    name_he: 'חוויה תרבותית בוינה',
    destination_id: AUSTRIA_ID,
    description: 'Immerse yourself in the imperial grandeur of Vienna.',
    description_he: 'טבלו בפאר הקיסרי של וינה עם ביקורים בארמונות ומוזיאונים.',
    duration_days: 5,
    image_url: 'https://images.unsplash.com/photo-1609838599411-e5b6d0a8f46a?w=800',
    price_from: 6500,
    currency: 'ILS',
    includes_flight: true,
    includes_hotel: true,
    includes_car: false,
    includes_attractions: true,
    trip_type: 'culture',
    suitable_for: 'couples, families, solo',
    highlights: ['Schönbrunn Palace', 'Vienna Opera', 'Belvedere Museum', 'Coffee house experience'],
    itinerary: [
      { day: 1, title: 'Arrival', activities: ['Airport transfer', 'Hotel check-in', 'Evening stroll'] },
      { day: 2, title: 'Imperial Vienna', activities: ['Schönbrunn Palace', 'Palace gardens', 'Naschmarkt'] },
      { day: 3, title: 'Art & Music', activities: ['Belvedere Museum', 'Café Sacher', 'Opera performance'] },
      { day: 4, title: 'Museums', activities: ['Kunsthistorisches Museum', 'Shopping', 'Traditional dinner'] },
      { day: 5, title: 'Departure', activities: ['Free morning', 'Airport transfer'] }
    ]
  },
  {
    id: uuidv4(),
    name: 'Austrian Alps Adventure',
    name_he: 'הרפתקאות באלפים',
    destination_id: AUSTRIA_ID,
    description: 'Experience the majestic Austrian Alps.',
    description_he: 'חוו את האלפים האוסטריים המרהיבים עם סקי או טיולים.',
    duration_days: 7,
    image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    price_from: 9800,
    currency: 'ILS',
    includes_flight: true,
    includes_hotel: true,
    includes_car: true,
    includes_attractions: true,
    trip_type: 'adventure',
    suitable_for: 'couples, families, adventure seekers',
    highlights: ['4x4 rental', 'Grossglockner Road', 'Hallstatt visit', 'Alpine activities'],
    itinerary: [
      { day: 1, title: 'Arrival in Innsbruck', activities: ['Flight', 'Car rental', 'Explore Old Town'] },
      { day: 2, title: 'Nordkette', activities: ['Cable car', 'Alpine hiking', 'Tyrolean dinner'] },
      { day: 3, title: 'To Salzburg', activities: ['Scenic drive', 'Swarovski Crystal Worlds', 'Salzburg evening'] },
      { day: 4, title: 'Salzburg', activities: ['Fortress', 'Sound of Music locations', 'Mozart House'] },
      { day: 5, title: 'Hallstatt', activities: ['Drive to Hallstatt', 'Skywalk', 'Lake cruise'] },
      { day: 6, title: 'Grossglockner', activities: ['High Alpine Road', 'Glacier viewing', 'Return'] },
      { day: 7, title: 'Departure', activities: ['Return car', 'Flight home'] }
    ]
  },
  {
    id: uuidv4(),
    name: 'Romantic Austria',
    name_he: 'אוסטריה רומנטית',
    destination_id: AUSTRIA_ID,
    description: 'A romantic getaway with spa and fine dining.',
    description_he: 'חופשה רומנטית הכוללת ספא וחוויות קולינריות.',
    duration_days: 5,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    price_from: 12500,
    currency: 'ILS',
    includes_flight: true,
    includes_hotel: true,
    includes_car: false,
    includes_attractions: true,
    trip_type: 'romantic',
    suitable_for: 'couples',
    highlights: ['Luxury hotel', 'Couples spa', 'Gourmet dining', 'Private concerts'],
    itinerary: [
      { day: 1, title: 'Romantic Arrival', activities: ['VIP transfer', 'Hotel Sacher', 'Champagne dinner'] },
      { day: 2, title: 'Imperial Romance', activities: ['Private Schönbrunn tour', 'Spa afternoon', 'Opera'] },
      { day: 3, title: 'Art & Wine', activities: ['Belvedere Museum', 'Wine tasting', 'Sunset cruise'] },
      { day: 4, title: 'Hallstatt Day', activities: ['Train to Hallstatt', 'Lake boat', 'Romantic dinner'] },
      { day: 5, title: 'Farewell', activities: ['Breakfast in bed', 'Departure'] }
    ]
  },
  {
    id: uuidv4(),
    name: 'Family Fun Austria',
    name_he: 'אוסטריה למשפחות',
    destination_id: AUSTRIA_ID,
    description: 'Family-friendly adventure with activities for all ages.',
    description_he: 'הרפתקה ידידותית למשפחה עם פעילויות לכל הגילאים.',
    duration_days: 7,
    image_url: 'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=800',
    price_from: 15900,
    currency: 'ILS',
    includes_flight: true,
    includes_hotel: true,
    includes_car: true,
    includes_attractions: true,
    trip_type: 'family',
    suitable_for: 'families with children',
    highlights: ['Prater amusement park', 'Zoo', 'Easy hiking', 'Interactive museums'],
    itinerary: [
      { day: 1, title: 'Welcome', activities: ['Hotel check-in', 'Prater park', 'Ferris wheel'] },
      { day: 2, title: 'Palace Fun', activities: ['Schönbrunn Palace & zoo', 'Maze', 'Gardens'] },
      { day: 3, title: 'Vienna Fun', activities: ['Aquarium', 'Ice cream', 'Playground'] },
      { day: 4, title: 'To Salzburg', activities: ['Train ride', 'Fortress funicular', 'Gardens'] },
      { day: 5, title: 'Activities', activities: ['Bike tour', 'Picnic', 'Mini golf'] },
      { day: 6, title: 'Nature', activities: ['Hellbrunn fountains', 'Alpine coaster', 'Dinner'] },
      { day: 7, title: 'Goodbye', activities: ['Shopping', 'Return home'] }
    ]
  }
];

// Seed function
const seedDatabase = () => {
  console.log('🌱 Starting database seed...\n');

  const data = {
    destinations,
    flights,
    hotels,
    car_rentals,
    attractions,
    trip_packages,
    user_trips: []
  };

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  console.log('✅ Database seeded successfully!');
  console.log(`
Summary:
  - ${destinations.length} destinations
  - ${flights.length} flights
  - ${hotels.length} hotels
  - ${car_rentals.length} car rentals
  - ${attractions.length} attractions
  - ${trip_packages.length} trip packages
  `);
};

// Check if database needs seeding
const checkAndSeed = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      if (data.destinations && data.destinations.length > 0) {
        console.log('✅ Database already seeded. Skipping...');
        return;
      }
    }
    seedDatabase();
  } catch (error) {
    console.log('Initializing database...');
    seedDatabase();
  }
};

checkAndSeed();
