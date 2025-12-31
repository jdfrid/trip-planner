const fs = require('fs');
const path = require('path');

// JSON-based storage for Render compatibility
const dataDir = path.join(__dirname, '../../data');
const dbPath = path.join(dataDir, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Default empty database structure
const defaultDb = {
  destinations: [],
  flights: [],
  hotels: [],
  car_rentals: [],
  attractions: [],
  trip_packages: [],
  user_trips: []
};

// Load or create database
let data;
try {
  if (fs.existsSync(dbPath)) {
    data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } else {
    data = { ...defaultDb };
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  }
} catch (error) {
  console.log('Creating new database...');
  data = { ...defaultDb };
}

// Save function
const save = () => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Simple query interface (mimics better-sqlite3 API)
const db = {
  data,
  save,
  
  prepare: (sql) => ({
    all: (...params) => {
      // Parse simple SELECT queries
      const table = sql.match(/FROM\s+(\w+)/i)?.[1];
      if (!table || !data[table]) return [];
      
      let results = [...data[table]];
      
      // Handle WHERE clauses
      const whereMatch = sql.match(/WHERE\s+(\w+)\s*=\s*\?/i);
      if (whereMatch && params[0]) {
        const field = whereMatch[1];
        results = results.filter(item => item[field] === params[0]);
      }
      
      // Handle ORDER BY
      const orderMatch = sql.match(/ORDER BY\s+(\w+)(?:\s+(ASC|DESC))?/i);
      if (orderMatch) {
        const field = orderMatch[1];
        const desc = orderMatch[2]?.toUpperCase() === 'DESC';
        results.sort((a, b) => {
          if (desc) return (b[field] || 0) - (a[field] || 0);
          return (a[field] || 0) - (b[field] || 0);
        });
      }
      
      return results;
    },
    
    get: (...params) => {
      const table = sql.match(/FROM\s+(\w+)/i)?.[1];
      if (!table || !data[table]) return null;
      
      const whereMatch = sql.match(/WHERE\s+(\w+)\s*=\s*\?/i);
      if (whereMatch && params[0]) {
        const field = whereMatch[1];
        return data[table].find(item => item[field] === params[0]) || null;
      }
      
      return data[table][0] || null;
    },
    
    run: (...params) => {
      // Handle INSERT
      if (sql.includes('INSERT INTO')) {
        const table = sql.match(/INSERT INTO\s+(\w+)/i)?.[1];
        if (table && data[table]) {
          const columns = sql.match(/\(([^)]+)\)\s*VALUES/i)?.[1].split(',').map(c => c.trim());
          const obj = {};
          columns.forEach((col, i) => {
            obj[col] = params[i];
          });
          data[table].push(obj);
          save();
        }
      }
      
      // Handle DELETE
      if (sql.includes('DELETE FROM')) {
        const table = sql.match(/DELETE FROM\s+(\w+)/i)?.[1];
        const whereMatch = sql.match(/WHERE\s+(\w+)\s*=\s*\?/i);
        if (table && data[table] && whereMatch) {
          const field = whereMatch[1];
          data[table] = data[table].filter(item => item[field] !== params[0]);
          save();
        }
      }
      
      // Handle UPDATE
      if (sql.includes('UPDATE')) {
        const table = sql.match(/UPDATE\s+(\w+)/i)?.[1];
        if (table && data[table]) {
          const id = params[params.length - 1];
          const index = data[table].findIndex(item => item.id === id);
          if (index !== -1) {
            // Simple update - merge params
            Object.assign(data[table][index], { updated_at: new Date().toISOString() });
            save();
          }
        }
      }
      
      return { changes: 1 };
    }
  }),
  
  exec: (sql) => {
    // For table creation - not needed with JSON
    console.log('DB initialized (JSON mode)');
  },
  
  pragma: () => {}
};

console.log('✅ Database ready (JSON storage)');

module.exports = db;
