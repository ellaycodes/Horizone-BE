const seed = require('./seed'); // Import the seed function
const db = require('./connection'); // Database connection
require('dotenv').config(); // Environment variables (if used)

seed() // Call the seed function with any necessary data
  .then(() => {
    console.log('Seeding complete!');
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
  })
  .finally(() => {
    db.end(); // Close the database connection
  });