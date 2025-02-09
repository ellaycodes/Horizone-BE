const { Pool } = require('pg');
require('dotenv').config();

// handle using the correct environment variables here

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL_EXTERNAL,
    ssl: {
        rejectUnauthorized: false
    }
});