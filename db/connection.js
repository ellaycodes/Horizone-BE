const { Pool } = require('pg');

// handle using the correct environment variables here

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

// or you can just export pool like below if you do not know the information above

module.exports = new Pool();