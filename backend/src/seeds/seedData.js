const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Austria Demo Data
const AUSTRIA_ID = uuidv4();
const VIENNA_ID = uuidv4();
const SALZBURG_ID = uuidv4();
const INNSBRUCK_ID = uuidv4();
const HALLSTATT_ID = uuidv4();

const destinations = [
  {
    id: AUSTRIA_ID,
    name: 'Austria',
    name_he: 'אוסטריה',
    country: 'Austria',
    country_he: 'אוסטריה',
    description: 'Austria is a stunning Central European country known for its Imperial palaces, Alpine peaks, and rich musical heritage. From the elegant streets of Vienna to the fairy-tale landscapes of Hallstatt, Austria offers a perfect blend of culture, nature, and adventure.',
    description_he: 'אוסטריה היא מדינה מרהיבה במרכז אירופה, ידועה בארמונותיה הקיסריים, פסגות האלפים שלה ומורשת המוזיקה העשירה. מהרחובות האלגנטיים של וינה ועד לנופי האגדה של הלשטאט, אוסטריה מציעה שילוב מושלם של תרבות, טבע והרפתקאות.',
    image_url: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=800',
      'https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=800',
      'https://images.unsplash.com/photo-1519923041100-16c60bd9d1b9?w=800'
    ]),
    best_season: 'All year - Winter for skiing, Summer for hiking',
    avg_temp_summer: 25,
    avg_temp_winter: 0,
    currency: 'EUR',
    language: 'German',
    timezone: 'CET (UTC+1)',
    visa_required: 0,
    tags: JSON.stringify(['alps', 'skiing', 'culture', 'music', 'nature', 'romantic', 'family']),
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
    baggage_included: 1,
    meal_included: 1,
    booking_url: 'https://www.austrian.com'
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
    baggage_included: 1,
    meal_included: 1,
    booking_url: 'https://www.elal.com'
  },
  {
    id: uuidv4(),
    airline: 'Wizz Air',
    airline_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Wizz_Air_logo.svg/200px-Wizz_Air_logo.svg.png',
    origin: 'Tel Aviv',
    origin_code: 'TLV',
    destination_id: AUSTRIA_ID,
    destination: 'Vienna',
    destination_code: 'VIE',
    departure_time: '06:00',
    arrival_time: '09:15',
    duration_minutes: 255,
    price_economy: 890,
    price_business: null,
    currency: 'ILS',
    stops: 0,
    baggage_included: 0,
    meal_included: 0,
    booking_url: 'https://www.wizzair.com'
  },
  {
    id: uuidv4(),
    airline: 'Lufthansa',
    airline_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Lufthansa_Logo_%28Crane%29.svg/200px-Lufthansa_Logo_%28Crane%29.svg.png',
    origin: 'Tel Aviv',
    origin_code: 'TLV',
    destination_id: AUSTRIA_ID,
    destination: 'Innsbruck',
    destination_code: 'INN',
    departure_time: '10:00',
    arrival_time: '16:30',
    duration_minutes: 390,
    price_economy: 1890,
    price_business: 5500,
    currency: 'ILS',
    stops: 1,
    baggage_included: 1,
    meal_included: 1,
    booking_url: 'https://www.lufthansa.com'
  }
];

const hotels = [
  // Vienna Hotels
  {
    id: uuidv4(),
    name: 'Hotel Sacher Wien',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    address: 'Philharmoniker Str. 4, 1010 Wien',
    stars: 5,
    rating: 4.9,
    reviews_count: 2847,
    description: 'The legendary Hotel Sacher Wien is a symbol of Viennese hospitality and home to the world-famous Original Sacher-Torte.',
    description_he: 'מלון סאכר וינה האגדי הוא סמל של האירוח הווינאי וביתה של עוגת הסאכר המפורסמת בעולם.',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ]),
    amenities: JSON.stringify(['Spa', 'Restaurant', 'Bar', 'Room Service', 'Concierge', 'WiFi', 'Gym']),
    price_per_night: 2100,
    currency: 'ILS',
    breakfast_included: 1,
    free_cancellation: 1,
    booking_url: 'https://www.sacher.com',
    latitude: 48.2039,
    longitude: 16.3695
  },
  {
    id: uuidv4(),
    name: 'The Ritz-Carlton Vienna',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    address: 'Schubertring 5-7, 1010 Wien',
    stars: 5,
    rating: 4.8,
    reviews_count: 1923,
    description: 'Luxury hotel on the famous Ringstrasse with stunning views and world-class amenities.',
    description_he: 'מלון יוקרה על הרינגשטראסה המפורסמת עם נופים מדהימים ושירותים ברמה עולמית.',
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    gallery: JSON.stringify([]),
    amenities: JSON.stringify(['Spa', 'Pool', 'Restaurant', 'Bar', 'Gym', 'WiFi', 'Valet Parking']),
    price_per_night: 2450,
    currency: 'ILS',
    breakfast_included: 1,
    free_cancellation: 1,
    booking_url: 'https://www.ritzcarlton.com/vienna',
    latitude: 48.2030,
    longitude: 16.3755
  },
  {
    id: uuidv4(),
    name: 'Hotel Imperial Vienna',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    address: 'Kärntner Ring 16, 1015 Wien',
    stars: 5,
    rating: 4.7,
    reviews_count: 1456,
    description: 'A former palace offering timeless elegance in the heart of Vienna.',
    description_he: 'ארמון לשעבר המציע אלגנטיות נצחית בלב וינה.',
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    gallery: JSON.stringify([]),
    amenities: JSON.stringify(['Spa', 'Restaurant', 'Bar', 'Concierge', 'WiFi', 'Butler Service']),
    price_per_night: 1890,
    currency: 'ILS',
    breakfast_included: 1,
    free_cancellation: 0,
    booking_url: 'https://www.imperialvienna.com',
    latitude: 48.2019,
    longitude: 16.3725
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
    description: 'Modern budget-design hotel in perfect location near the Opera House.',
    description_he: 'מלון עיצוב תקציבי מודרני במיקום מושלם ליד בית האופרה.',
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    gallery: JSON.stringify([]),
    amenities: JSON.stringify(['Bar', 'WiFi', 'Air Conditioning']),
    price_per_night: 520,
    currency: 'ILS',
    breakfast_included: 0,
    free_cancellation: 1,
    booking_url: 'https://www.motel-one.com',
    latitude: 48.2025,
    longitude: 16.3680
  },
  // Salzburg Hotels
  {
    id: uuidv4(),
    name: 'Hotel Goldener Hirsch',
    destination_id: AUSTRIA_ID,
    city: 'Salzburg',
    address: 'Getreidegasse 37, 5020 Salzburg',
    stars: 5,
    rating: 4.8,
    reviews_count: 987,
    description: 'Historic luxury hotel in the heart of Salzburg Old Town, dating back to 1407.',
    description_he: 'מלון יוקרה היסטורי בלב העיר העתיקה של זלצבורג, מאז 1407.',
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    gallery: JSON.stringify([]),
    amenities: JSON.stringify(['Restaurant', 'Bar', 'Concierge', 'WiFi', 'Room Service']),
    price_per_night: 1650,
    currency: 'ILS',
    breakfast_included: 1,
    free_cancellation: 1,
    booking_url: 'https://www.goldenerhirsch.com',
    latitude: 47.7999,
    longitude: 13.0447
  },
  // Innsbruck Hotels
  {
    id: uuidv4(),
    name: 'Grand Hotel Europa',
    destination_id: AUSTRIA_ID,
    city: 'Innsbruck',
    address: 'Südtiroler Platz 2, 6020 Innsbruck',
    stars: 5,
    rating: 4.6,
    reviews_count: 1234,
    description: 'Elegant hotel near the train station with stunning Alpine views.',
    description_he: 'מלון אלגנטי ליד תחנת הרכבת עם נופים מרהיבים של האלפים.',
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    gallery: JSON.stringify([]),
    amenities: JSON.stringify(['Spa', 'Pool', 'Restaurant', 'Bar', 'Gym', 'WiFi', 'Ski Storage']),
    price_per_night: 980,
    currency: 'ILS',
    breakfast_included: 1,
    free_cancellation: 1,
    booking_url: 'https://www.grandhoteleuropa.at',
    latitude: 47.2625,
    longitude: 11.3930
  },
  // Hallstatt
  {
    id: uuidv4(),
    name: 'Heritage Hotel Hallstatt',
    destination_id: AUSTRIA_ID,
    city: 'Hallstatt',
    address: 'Landungsplatz 101, 4830 Hallstatt',
    stars: 4,
    rating: 4.7,
    reviews_count: 567,
    description: 'Boutique hotel with breathtaking lake views in the UNESCO World Heritage village.',
    description_he: 'מלון בוטיק עם נופי אגם עוצרי נשימה בכפר מורשת עולמית של אונסקו.',
    image_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
    gallery: JSON.stringify([]),
    amenities: JSON.stringify(['Restaurant', 'Terrace', 'WiFi', 'Lake View']),
    price_per_night: 1150,
    currency: 'ILS',
    breakfast_included: 1,
    free_cancellation: 0,
    booking_url: 'https://www.hotel-hallstatt.com',
    latitude: 47.5622,
    longitude: 13.6493
  }
];

const carRentals = [
  {
    id: uuidv4(),
    company: 'Europcar',
    company_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Europcar_logo.svg/200px-Europcar_logo.svg.png',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    car_type: 'Economy',
    car_model: 'VW Polo',
    car_image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400',
    seats: 5,
    transmission: 'Manual',
    fuel_type: 'Petrol',
    ac_included: 1,
    gps_included: 0,
    price_per_day: 180,
    currency: 'ILS',
    insurance_included: 1,
    unlimited_mileage: 1,
    pickup_location: 'Vienna Airport (VIE)',
    booking_url: 'https://www.europcar.com'
  },
  {
    id: uuidv4(),
    company: 'Hertz',
    company_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Hertz_logo.svg/200px-Hertz_logo.svg.png',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    car_type: 'SUV',
    car_model: 'BMW X3',
    car_image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
    seats: 5,
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    ac_included: 1,
    gps_included: 1,
    price_per_day: 450,
    currency: 'ILS',
    insurance_included: 1,
    unlimited_mileage: 1,
    pickup_location: 'Vienna Airport (VIE)',
    booking_url: 'https://www.hertz.com'
  },
  {
    id: uuidv4(),
    company: 'Sixt',
    company_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sixt_Logo_2023.svg/200px-Sixt_Logo_2023.svg.png',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    car_type: 'Compact',
    car_model: 'Audi A3',
    car_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
    seats: 5,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    ac_included: 1,
    gps_included: 1,
    price_per_day: 290,
    currency: 'ILS',
    insurance_included: 1,
    unlimited_mileage: 1,
    pickup_location: 'Vienna Airport (VIE)',
    booking_url: 'https://www.sixt.com'
  },
  {
    id: uuidv4(),
    company: 'Enterprise',
    company_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Enterprise_logo.svg/200px-Enterprise_logo.svg.png',
    destination_id: AUSTRIA_ID,
    city: 'Innsbruck',
    car_type: 'SUV 4x4',
    car_model: 'Audi Q5 Quattro',
    car_image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400',
    seats: 5,
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    ac_included: 1,
    gps_included: 1,
    price_per_day: 520,
    currency: 'ILS',
    insurance_included: 1,
    unlimited_mileage: 1,
    pickup_location: 'Innsbruck Airport (INN)',
    booking_url: 'https://www.enterprise.com'
  }
];

const attractions = [
  // Vienna Attractions
  {
    id: uuidv4(),
    name: 'Schönbrunn Palace',
    name_he: 'ארמון שנברון',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    type: 'culture',
    description: 'The magnificent summer residence of the Habsburgs with 1,441 rooms and beautiful gardens.',
    description_he: 'מעונה הקיצי המרהיב של שושלת הבסבורג עם 1,441 חדרים וגנים יפהפיים.',
    image_url: 'https://images.unsplash.com/photo-1609838599411-e5b6d0a8f46a?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 3,
    price: 24,
    currency: 'EUR',
    rating: 4.8,
    reviews_count: 45678,
    opening_hours: '08:00-17:30',
    address: 'Schönbrunner Schloßstraße 47, 1130 Wien',
    booking_required: 1,
    booking_url: 'https://www.schoenbrunn.at',
    tips: 'Book Grand Tour tickets online to skip lines. Dont miss the Gloriette for sunset views.',
    tags: JSON.stringify(['palace', 'history', 'gardens', 'UNESCO', 'family']),
    latitude: 48.1845,
    longitude: 16.3122
  },
  {
    id: uuidv4(),
    name: 'Vienna State Opera',
    name_he: 'בית האופרה הממלכתי של וינה',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    type: 'culture',
    description: 'One of the worlds most prestigious opera houses, offering world-class performances.',
    description_he: 'אחד מבתי האופרה היוקרתיים בעולם, מציע הופעות ברמה עולמית.',
    image_url: 'https://images.unsplash.com/photo-1572468831937-1bc8ecb8d33c?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 3,
    price: 15,
    currency: 'EUR',
    rating: 4.7,
    reviews_count: 12345,
    opening_hours: 'Performances typically 19:00-22:00',
    address: 'Opernring 2, 1010 Wien',
    booking_required: 1,
    booking_url: 'https://www.wiener-staatsoper.at',
    tips: 'Standing room tickets available for under €15. Guided tours available during the day.',
    tags: JSON.stringify(['opera', 'music', 'culture', 'architecture', 'romantic']),
    latitude: 48.2035,
    longitude: 16.3688
  },
  {
    id: uuidv4(),
    name: 'St. Stephens Cathedral',
    name_he: 'קתדרלת סנט סטפן',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    type: 'culture',
    description: 'Viennas iconic Gothic cathedral with its distinctive tiled roof.',
    description_he: 'הקתדרלה הגותית האייקונית של וינה עם גג האריחים הייחודי שלה.',
    image_url: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 1.5,
    price: 6,
    currency: 'EUR',
    rating: 4.6,
    reviews_count: 34567,
    opening_hours: '06:00-22:00',
    address: 'Stephansplatz 3, 1010 Wien',
    booking_required: 0,
    booking_url: 'https://www.stephanskirche.at',
    tips: 'Climb the South Tower for amazing city views. Free organ concerts on Sundays.',
    tags: JSON.stringify(['cathedral', 'architecture', 'history', 'free']),
    latitude: 48.2084,
    longitude: 16.3731
  },
  {
    id: uuidv4(),
    name: 'Belvedere Museum',
    name_he: 'מוזיאון בלוודרה',
    destination_id: AUSTRIA_ID,
    city: 'Vienna',
    type: 'culture',
    description: 'Baroque palace housing Gustav Klimts famous "The Kiss" and other masterpieces.',
    description_he: 'ארמון בסגנון בארוק המאכלס את "הנשיקה" המפורסמת של גוסטב קלימט ויצירות מופת נוספות.',
    image_url: 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 2.5,
    price: 22,
    currency: 'EUR',
    rating: 4.7,
    reviews_count: 23456,
    opening_hours: '09:00-18:00 (Fri until 21:00)',
    address: 'Prinz Eugen-Straße 27, 1030 Wien',
    booking_required: 1,
    booking_url: 'https://www.belvedere.at',
    tips: 'Visit on Friday evening for a less crowded experience. The gardens are free to visit.',
    tags: JSON.stringify(['museum', 'art', 'klimt', 'baroque', 'romantic']),
    latitude: 48.1914,
    longitude: 16.3805
  },
  // Salzburg Attractions
  {
    id: uuidv4(),
    name: 'Hohensalzburg Fortress',
    name_he: 'מבצר הוהנזלצבורג',
    destination_id: AUSTRIA_ID,
    city: 'Salzburg',
    type: 'culture',
    description: 'One of Europes largest medieval castles, offering panoramic views of Salzburg.',
    description_he: 'אחד הטירות מימי הביניים הגדולות באירופה, המציע נופים פנורמיים של זלצבורג.',
    image_url: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 2.5,
    price: 16.30,
    currency: 'EUR',
    rating: 4.7,
    reviews_count: 15678,
    opening_hours: '09:30-17:00',
    address: 'Mönchsberg 34, 5020 Salzburg',
    booking_required: 0,
    booking_url: 'https://www.salzburg-burgen.at',
    tips: 'Take the funicular up and walk down through the old town. Night tours available in summer.',
    tags: JSON.stringify(['castle', 'history', 'views', 'family']),
    latitude: 47.7953,
    longitude: 13.0475
  },
  {
    id: uuidv4(),
    name: 'Mozarts Birthplace',
    name_he: 'בית הולדתו של מוצרט',
    destination_id: AUSTRIA_ID,
    city: 'Salzburg',
    type: 'culture',
    description: 'The house where Wolfgang Amadeus Mozart was born in 1756.',
    description_he: 'הבית שבו נולד וולפגנג אמדאוס מוצרט בשנת 1756.',
    image_url: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 1.5,
    price: 14,
    currency: 'EUR',
    rating: 4.4,
    reviews_count: 8765,
    opening_hours: '09:00-17:30',
    address: 'Getreidegasse 9, 5020 Salzburg',
    booking_required: 0,
    booking_url: 'https://mozarteum.at',
    tips: 'Combined ticket available with Mozart Residence. Audio guide included.',
    tags: JSON.stringify(['museum', 'music', 'mozart', 'history']),
    latitude: 47.8001,
    longitude: 13.0438
  },
  {
    id: uuidv4(),
    name: 'Sound of Music Tour',
    name_he: 'סיור צלילי המוזיקה',
    destination_id: AUSTRIA_ID,
    city: 'Salzburg',
    type: 'tour',
    description: 'Visit the filming locations of the beloved movie "The Sound of Music".',
    description_he: 'בקרו במיקומי הצילום של הסרט האהוב "צלילי המוזיקה".',
    image_url: 'https://images.unsplash.com/photo-1594735970809-2ee07ecec3d4?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 4,
    price: 55,
    currency: 'EUR',
    rating: 4.8,
    reviews_count: 5678,
    opening_hours: 'Tours at 09:00 and 14:00',
    address: 'Mirabellplatz, 5020 Salzburg',
    booking_required: 1,
    booking_url: 'https://www.panoramatours.com/en/salzburg/sound-of-music-tour',
    tips: 'Book ahead in summer. Bring your singing voice!',
    tags: JSON.stringify(['tour', 'movie', 'nature', 'family', 'music']),
    latitude: 47.8057,
    longitude: 13.0424
  },
  // Nature & Adventure
  {
    id: uuidv4(),
    name: 'Nordkette Cable Car',
    name_he: 'רכבל נורדקטה',
    destination_id: AUSTRIA_ID,
    city: 'Innsbruck',
    type: 'nature',
    description: 'Ride from the city center to 2,300m for breathtaking Alpine views.',
    description_he: 'נסיעה ממרכז העיר לגובה 2,300 מטר לנופים עוצרי נשימה של האלפים.',
    image_url: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 3,
    price: 42,
    currency: 'EUR',
    rating: 4.8,
    reviews_count: 7890,
    opening_hours: '08:30-17:30',
    address: 'Rennweg 3, 6020 Innsbruck',
    booking_required: 0,
    booking_url: 'https://www.nordkette.com',
    tips: 'Best views on clear days. Combine with hiking in summer or skiing in winter.',
    tags: JSON.stringify(['nature', 'views', 'adventure', 'skiing', 'hiking']),
    latitude: 47.2574,
    longitude: 11.3928
  },
  {
    id: uuidv4(),
    name: 'Hallstatt Skywalk',
    name_he: 'סקייווק הלשטאט',
    destination_id: AUSTRIA_ID,
    city: 'Hallstatt',
    type: 'nature',
    description: 'Viewing platform 350m above the village with spectacular lake and mountain views.',
    description_he: 'מצפה תצפית 350 מטר מעל הכפר עם נופים מרהיבים של האגם וההרים.',
    image_url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 2,
    price: 36,
    currency: 'EUR',
    rating: 4.7,
    reviews_count: 4567,
    opening_hours: '09:30-16:00',
    address: 'Salzbergstraße 21, 4830 Hallstatt',
    booking_required: 0,
    booking_url: 'https://www.salzwelten.at/en/hallstatt/',
    tips: 'Include the salt mine tour for the complete experience. Take the funicular up.',
    tags: JSON.stringify(['nature', 'views', 'UNESCO', 'lake', 'photography']),
    latitude: 47.5548,
    longitude: 13.6454
  },
  {
    id: uuidv4(),
    name: 'Grossglockner High Alpine Road',
    name_he: 'כביש האלפים גרוסגלוקנר',
    destination_id: AUSTRIA_ID,
    city: 'Salzburg Region',
    type: 'nature',
    description: 'One of Europes most scenic drives, leading to Austrias highest peak.',
    description_he: 'אחד הכבישים הציוריים ביותר באירופה, המוביל לפסגה הגבוהה ביותר באוסטריה.',
    image_url: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 6,
    price: 41,
    currency: 'EUR',
    rating: 4.9,
    reviews_count: 6789,
    opening_hours: 'May-October, 05:00-21:30',
    address: 'Grossglockner Hochalpenstrasse',
    booking_required: 0,
    booking_url: 'https://www.grossglockner.at',
    tips: 'Stop at Kaiser-Franz-Josefs-Höhe for glacier views. Allow full day for the experience.',
    tags: JSON.stringify(['nature', 'driving', 'mountains', 'glacier', 'adventure']),
    latitude: 47.0736,
    longitude: 12.7523
  },
  // Skiing
  {
    id: uuidv4(),
    name: 'St. Anton am Arlberg',
    name_he: 'סנט אנטון אם ארלברג',
    destination_id: AUSTRIA_ID,
    city: 'Tyrol',
    type: 'ski',
    description: 'World-renowned ski resort, birthplace of alpine skiing with 300km of runs.',
    description_he: 'אתר סקי בעל שם עולמי, מקום הולדת הסקי האלפיני עם 300 קמ של מסלולים.',
    image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    gallery: JSON.stringify([]),
    duration_hours: 8,
    price: 72,
    currency: 'EUR',
    rating: 4.9,
    reviews_count: 12345,
    opening_hours: 'December-April, 08:30-16:30',
    address: 'St. Anton am Arlberg, 6580 Tyrol',
    booking_required: 0,
    booking_url: 'https://www.stantonamarlberg.com',
    tips: 'Book ski passes in advance for discounts. Great après-ski scene!',
    tags: JSON.stringify(['ski', 'winter', 'adventure', 'luxury', 'nightlife']),
    latitude: 47.1287,
    longitude: 10.2633
  }
];

const tripPackages = [
  {
    id: uuidv4(),
    name: 'Vienna Cultural Experience',
    name_he: 'חוויה תרבותית בוינה',
    destination_id: AUSTRIA_ID,
    description: 'Immerse yourself in the imperial grandeur of Vienna with visits to palaces, museums, and the famous Vienna State Opera.',
    description_he: 'טבלו בפאר הקיסרי של וינה עם ביקורים בארמונות, מוזיאונים ובית האופרה המפורסם של וינה.',
    duration_days: 5,
    image_url: 'https://images.unsplash.com/photo-1609838599411-e5b6d0a8f46a?w=800',
    price_from: 6500,
    currency: 'ILS',
    includes_flight: 1,
    includes_hotel: 1,
    includes_car: 0,
    includes_attractions: 1,
    trip_type: 'culture',
    suitable_for: 'couples, families, solo',
    highlights: JSON.stringify([
      'Tour of Schönbrunn Palace',
      'Vienna State Opera performance',
      'Belvedere Museum with Klimt',
      'Traditional Viennese coffee house experience',
      'Walking tour of the historic center'
    ]),
    itinerary: JSON.stringify([
      { day: 1, title: 'Arrival & City Introduction', activities: ['Airport transfer', 'Hotel check-in', 'Evening stroll on Ringstrasse'] },
      { day: 2, title: 'Imperial Vienna', activities: ['Schönbrunn Palace tour', 'Palace gardens', 'Naschmarkt for lunch', 'St. Stephens Cathedral'] },
      { day: 3, title: 'Art & Music', activities: ['Belvedere Museum', 'Coffee at Café Sacher', 'Evening opera performance'] },
      { day: 4, title: 'Museums & Shopping', activities: ['Kunsthistorisches Museum', 'Mariahilfer Straße shopping', 'Traditional dinner'] },
      { day: 5, title: 'Departure', activities: ['Free morning', 'Airport transfer'] }
    ])
  },
  {
    id: uuidv4(),
    name: 'Austrian Alps Adventure',
    name_he: 'הרפתקאות באלפים האוסטריים',
    destination_id: AUSTRIA_ID,
    description: 'Experience the majestic Austrian Alps with skiing in winter or hiking in summer, plus visits to charming Alpine villages.',
    description_he: 'חוו את האלפים האוסטריים המרהיבים עם סקי בחורף או טיולים בקיץ, בתוספת ביקורים בכפרים אלפיניים קסומים.',
    duration_days: 7,
    image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    price_from: 9800,
    currency: 'ILS',
    includes_flight: 1,
    includes_hotel: 1,
    includes_car: 1,
    includes_attractions: 1,
    trip_type: 'adventure',
    suitable_for: 'couples, families, adventure seekers',
    highlights: JSON.stringify([
      '4x4 rental for scenic drives',
      'Grossglockner High Alpine Road',
      'Nordkette cable car experience',
      'Hallstatt village visit',
      'Ski pass or hiking trails (seasonal)'
    ]),
    itinerary: JSON.stringify([
      { day: 1, title: 'Arrival in Innsbruck', activities: ['Flight to Innsbruck', 'Pick up rental car', 'Explore Innsbruck Old Town'] },
      { day: 2, title: 'Nordkette & Innsbruck', activities: ['Nordkette cable car', 'Alpine hiking/skiing', 'Traditional Tyrolean dinner'] },
      { day: 3, title: 'Drive to Salzburg', activities: ['Scenic mountain drive', 'Stop at Swarovski Crystal Worlds', 'Evening in Salzburg'] },
      { day: 4, title: 'Salzburg Exploration', activities: ['Hohensalzburg Fortress', 'Sound of Music locations', 'Mozarts Birthplace'] },
      { day: 5, title: 'Hallstatt Day Trip', activities: ['Drive to Hallstatt', 'Skywalk & Salt Mine', 'Lake cruise'] },
      { day: 6, title: 'Grossglockner Drive', activities: ['High Alpine Road experience', 'Glacier viewing', 'Return to Innsbruck'] },
      { day: 7, title: 'Departure', activities: ['Return rental car', 'Flight home'] }
    ])
  },
  {
    id: uuidv4(),
    name: 'Romantic Austria for Two',
    name_he: 'אוסטריה רומנטית לזוגות',
    destination_id: AUSTRIA_ID,
    description: 'A romantic getaway featuring candlelit dinners, spa experiences, and the most romantic spots in Austria.',
    description_he: 'חופשה רומנטית הכוללת ארוחות ערב לאור נרות, חוויות ספא והמקומות הרומנטיים ביותר באוסטריה.',
    duration_days: 5,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    price_from: 12500,
    currency: 'ILS',
    includes_flight: 1,
    includes_hotel: 1,
    includes_car: 0,
    includes_attractions: 1,
    trip_type: 'romantic',
    suitable_for: 'couples',
    highlights: JSON.stringify([
      'Luxury 5-star hotel accommodation',
      'Couples spa treatment',
      'Private horse-drawn carriage ride',
      'Gourmet dining experiences',
      'Private opera box or concert'
    ]),
    itinerary: JSON.stringify([
      { day: 1, title: 'Romantic Arrival', activities: ['VIP airport transfer', 'Hotel Sacher check-in', 'Champagne welcome', 'Candlelit dinner'] },
      { day: 2, title: 'Imperial Romance', activities: ['Private Schönbrunn tour', 'Spa afternoon', 'Vienna State Opera evening'] },
      { day: 3, title: 'Art & Indulgence', activities: ['Klimts "The Kiss" at Belvedere', 'Wine tasting in Wachau Valley', 'Sunset boat cruise'] },
      { day: 4, title: 'Day Trip to Hallstatt', activities: ['Train to Hallstatt', 'Lake boat ride', 'Romantic lakeside lunch', 'Return to Vienna'] },
      { day: 5, title: 'Farewell', activities: ['Breakfast in bed', 'Leisurely departure'] }
    ])
  },
  {
    id: uuidv4(),
    name: 'Family Fun Austria',
    name_he: 'אוסטריה לכל המשפחה',
    destination_id: AUSTRIA_ID,
    description: 'A family-friendly adventure with activities for all ages, from palaces to adventure parks.',
    description_he: 'הרפתקה ידידותית למשפחה עם פעילויות לכל הגילאים, מארמונות ועד פארקי הרפתקאות.',
    duration_days: 7,
    image_url: 'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=800',
    price_from: 15900,
    currency: 'ILS',
    includes_flight: 1,
    includes_hotel: 1,
    includes_car: 1,
    includes_attractions: 1,
    trip_type: 'family',
    suitable_for: 'families with children',
    highlights: JSON.stringify([
      'Family-friendly hotels',
      'Zoo and adventure activities',
      'Easy hiking trails',
      'Interactive museums',
      'Child-friendly restaurants'
    ]),
    itinerary: JSON.stringify([
      { day: 1, title: 'Welcome to Vienna', activities: ['Family hotel check-in', 'Prater amusement park', 'Giant Ferris wheel ride'] },
      { day: 2, title: 'Palace Adventures', activities: ['Schönbrunn Palace & zoo', 'Maze and labyrinth', 'Palace gardens play area'] },
      { day: 3, title: 'Interactive Vienna', activities: ['Haus des Meeres aquarium', 'Ice cream at Eis Greissler', 'Danube Island playground'] },
      { day: 4, title: 'Salzburg Bound', activities: ['Train to Salzburg', 'Fortress funicular ride', 'Mirabell Gardens'] },
      { day: 5, title: 'Sound of Music', activities: ['Family bike tour', 'Lakeside picnic', 'Mini golf'] },
      { day: 6, title: 'Nature Day', activities: ['Hellbrunn trick fountains', 'Alpine coaster ride', 'Farewell dinner'] },
      { day: 7, title: 'Goodbye Austria', activities: ['Souvenir shopping', 'Return home'] }
    ])
  }
];

// Seed function
const seedDatabase = () => {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data
  console.log('Clearing existing data...');
  db.exec('DELETE FROM user_trips');
  db.exec('DELETE FROM trip_packages');
  db.exec('DELETE FROM attractions');
  db.exec('DELETE FROM car_rentals');
  db.exec('DELETE FROM hotels');
  db.exec('DELETE FROM flights');
  db.exec('DELETE FROM destinations');

  // Insert destinations
  console.log('Inserting destinations...');
  const destStmt = db.prepare(`
    INSERT INTO destinations (id, name, name_he, country, country_he, description, description_he,
      image_url, gallery, best_season, avg_temp_summer, avg_temp_winter, currency, language,
      timezone, visa_required, tags, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  destinations.forEach(d => {
    destStmt.run(d.id, d.name, d.name_he, d.country, d.country_he, d.description, d.description_he,
      d.image_url, d.gallery, d.best_season, d.avg_temp_summer, d.avg_temp_winter, d.currency, d.language,
      d.timezone, d.visa_required, d.tags, d.latitude, d.longitude);
  });
  console.log(`  ✓ ${destinations.length} destinations inserted`);

  // Insert flights
  console.log('Inserting flights...');
  const flightStmt = db.prepare(`
    INSERT INTO flights (id, airline, airline_logo, origin, origin_code, destination_id, destination,
      destination_code, departure_time, arrival_time, duration_minutes, price_economy, price_business,
      currency, stops, baggage_included, meal_included, booking_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  flights.forEach(f => {
    flightStmt.run(f.id, f.airline, f.airline_logo, f.origin, f.origin_code, f.destination_id, f.destination,
      f.destination_code, f.departure_time, f.arrival_time, f.duration_minutes, f.price_economy, f.price_business,
      f.currency, f.stops, f.baggage_included, f.meal_included, f.booking_url);
  });
  console.log(`  ✓ ${flights.length} flights inserted`);

  // Insert hotels
  console.log('Inserting hotels...');
  const hotelStmt = db.prepare(`
    INSERT INTO hotels (id, name, destination_id, city, address, stars, rating, reviews_count,
      description, description_he, image_url, gallery, amenities, price_per_night, currency,
      breakfast_included, free_cancellation, booking_url, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  hotels.forEach(h => {
    hotelStmt.run(h.id, h.name, h.destination_id, h.city, h.address, h.stars, h.rating, h.reviews_count,
      h.description, h.description_he, h.image_url, h.gallery, h.amenities, h.price_per_night, h.currency,
      h.breakfast_included, h.free_cancellation, h.booking_url, h.latitude, h.longitude);
  });
  console.log(`  ✓ ${hotels.length} hotels inserted`);

  // Insert car rentals
  console.log('Inserting car rentals...');
  const carStmt = db.prepare(`
    INSERT INTO car_rentals (id, company, company_logo, destination_id, city, car_type, car_model,
      car_image, seats, transmission, fuel_type, ac_included, gps_included, price_per_day, currency,
      insurance_included, unlimited_mileage, pickup_location, booking_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  carRentals.forEach(c => {
    carStmt.run(c.id, c.company, c.company_logo, c.destination_id, c.city, c.car_type, c.car_model,
      c.car_image, c.seats, c.transmission, c.fuel_type, c.ac_included, c.gps_included, c.price_per_day,
      c.currency, c.insurance_included, c.unlimited_mileage, c.pickup_location, c.booking_url);
  });
  console.log(`  ✓ ${carRentals.length} car rentals inserted`);

  // Insert attractions
  console.log('Inserting attractions...');
  const attrStmt = db.prepare(`
    INSERT INTO attractions (id, name, name_he, destination_id, city, type, description, description_he,
      image_url, gallery, duration_hours, price, currency, rating, reviews_count, opening_hours, address,
      booking_required, booking_url, tips, tags, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  attractions.forEach(a => {
    attrStmt.run(a.id, a.name, a.name_he, a.destination_id, a.city, a.type, a.description, a.description_he,
      a.image_url, a.gallery, a.duration_hours, a.price, a.currency, a.rating, a.reviews_count, a.opening_hours,
      a.address, a.booking_required, a.booking_url, a.tips, a.tags, a.latitude, a.longitude);
  });
  console.log(`  ✓ ${attractions.length} attractions inserted`);

  // Insert trip packages
  console.log('Inserting trip packages...');
  const pkgStmt = db.prepare(`
    INSERT INTO trip_packages (id, name, name_he, destination_id, description, description_he, duration_days,
      image_url, price_from, currency, includes_flight, includes_hotel, includes_car, includes_attractions,
      trip_type, suitable_for, highlights, itinerary)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  tripPackages.forEach(p => {
    pkgStmt.run(p.id, p.name, p.name_he, p.destination_id, p.description, p.description_he, p.duration_days,
      p.image_url, p.price_from, p.currency, p.includes_flight, p.includes_hotel, p.includes_car,
      p.includes_attractions, p.trip_type, p.suitable_for, p.highlights, p.itinerary);
  });
  console.log(`  ✓ ${tripPackages.length} trip packages inserted`);

  console.log('\n✅ Database seeded successfully!');
  console.log(`
Summary:
  - ${destinations.length} destinations
  - ${flights.length} flights
  - ${hotels.length} hotels
  - ${carRentals.length} car rentals
  - ${attractions.length} attractions
  - ${tripPackages.length} trip packages
  `);
};

// Check if database already has data
const checkAndSeed = () => {
  try {
    const count = db.prepare('SELECT COUNT(*) as count FROM destinations').get();
    if (count.count > 0) {
      console.log('✅ Database already seeded with', count.count, 'destinations. Skipping...');
      return;
    }
    seedDatabase();
  } catch (error) {
    // Table might not exist yet, run seed
    console.log('Initializing database...');
    seedDatabase();
  }
};

// Run seed check
checkAndSeed();

