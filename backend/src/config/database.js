const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'tripplanner.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
const initDatabase = () => {
  // Destinations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS destinations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_he TEXT,
      country TEXT NOT NULL,
      country_he TEXT,
      description TEXT,
      description_he TEXT,
      image_url TEXT,
      gallery TEXT,
      best_season TEXT,
      avg_temp_summer INTEGER,
      avg_temp_winter INTEGER,
      currency TEXT,
      language TEXT,
      timezone TEXT,
      visa_required INTEGER DEFAULT 0,
      tags TEXT,
      latitude REAL,
      longitude REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Flights table
  db.exec(`
    CREATE TABLE IF NOT EXISTS flights (
      id TEXT PRIMARY KEY,
      airline TEXT NOT NULL,
      airline_logo TEXT,
      origin TEXT NOT NULL,
      origin_code TEXT,
      destination_id TEXT,
      destination TEXT NOT NULL,
      destination_code TEXT,
      departure_time TEXT,
      arrival_time TEXT,
      duration_minutes INTEGER,
      price_economy REAL,
      price_business REAL,
      currency TEXT DEFAULT 'ILS',
      stops INTEGER DEFAULT 0,
      baggage_included INTEGER DEFAULT 1,
      meal_included INTEGER DEFAULT 0,
      booking_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id)
    )
  `);

  // Hotels table
  db.exec(`
    CREATE TABLE IF NOT EXISTS hotels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      destination_id TEXT,
      city TEXT NOT NULL,
      address TEXT,
      stars INTEGER,
      rating REAL,
      reviews_count INTEGER DEFAULT 0,
      description TEXT,
      description_he TEXT,
      image_url TEXT,
      gallery TEXT,
      amenities TEXT,
      price_per_night REAL,
      currency TEXT DEFAULT 'ILS',
      breakfast_included INTEGER DEFAULT 0,
      free_cancellation INTEGER DEFAULT 0,
      booking_url TEXT,
      latitude REAL,
      longitude REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id)
    )
  `);

  // Car rentals table
  db.exec(`
    CREATE TABLE IF NOT EXISTS car_rentals (
      id TEXT PRIMARY KEY,
      company TEXT NOT NULL,
      company_logo TEXT,
      destination_id TEXT,
      city TEXT NOT NULL,
      car_type TEXT NOT NULL,
      car_model TEXT,
      car_image TEXT,
      seats INTEGER,
      transmission TEXT,
      fuel_type TEXT,
      ac_included INTEGER DEFAULT 1,
      gps_included INTEGER DEFAULT 0,
      price_per_day REAL,
      currency TEXT DEFAULT 'ILS',
      insurance_included INTEGER DEFAULT 0,
      unlimited_mileage INTEGER DEFAULT 1,
      pickup_location TEXT,
      booking_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id)
    )
  `);

  // Attractions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS attractions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_he TEXT,
      destination_id TEXT,
      city TEXT,
      type TEXT,
      description TEXT,
      description_he TEXT,
      image_url TEXT,
      gallery TEXT,
      duration_hours REAL,
      price REAL,
      currency TEXT DEFAULT 'EUR',
      rating REAL,
      reviews_count INTEGER DEFAULT 0,
      opening_hours TEXT,
      address TEXT,
      booking_required INTEGER DEFAULT 0,
      booking_url TEXT,
      tips TEXT,
      tags TEXT,
      latitude REAL,
      longitude REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id)
    )
  `);

  // Trip packages table (pre-built packages)
  db.exec(`
    CREATE TABLE IF NOT EXISTS trip_packages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_he TEXT,
      destination_id TEXT,
      description TEXT,
      description_he TEXT,
      duration_days INTEGER,
      image_url TEXT,
      price_from REAL,
      currency TEXT DEFAULT 'ILS',
      includes_flight INTEGER DEFAULT 1,
      includes_hotel INTEGER DEFAULT 1,
      includes_car INTEGER DEFAULT 0,
      includes_attractions INTEGER DEFAULT 0,
      trip_type TEXT,
      suitable_for TEXT,
      highlights TEXT,
      itinerary TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id)
    )
  `);

  // User trips (saved/planned trips)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_trips (
      id TEXT PRIMARY KEY,
      session_id TEXT,
      destination_id TEXT,
      flight_id TEXT,
      hotel_id TEXT,
      car_rental_id TEXT,
      attractions TEXT,
      start_date TEXT,
      end_date TEXT,
      travelers_count INTEGER DEFAULT 2,
      total_price REAL,
      currency TEXT DEFAULT 'ILS',
      status TEXT DEFAULT 'planning',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id),
      FOREIGN KEY (flight_id) REFERENCES flights(id),
      FOREIGN KEY (hotel_id) REFERENCES hotels(id),
      FOREIGN KEY (car_rental_id) REFERENCES car_rentals(id)
    )
  `);

  console.log('Database initialized successfully');
};

// Initialize on import
initDatabase();

module.exports = db;

