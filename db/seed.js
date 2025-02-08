const db = require("./connection.js");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS streaks`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS weights`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS calories`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS meals`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS fasting_sessions`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age INT,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
    })
    .then(() => {
      return db.query(`CREATE TABLE fasting_sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration INTERVAL GENERATED ALWAYS AS (end_time - start_time) STORED,
    success BOOLEAN DEFAULT TRUE
);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    meal_name VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    meal_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE calories (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    daily_goal INT NOT NULL,
    current_intake INT DEFAULT 0,
    date DATE DEFAULT CURRENT_DATE
);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE weights (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    weight DECIMAL(5,2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE streaks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_fast_date DATE
);`);
    })
    .then(() => {
      return db.query(`INSERT INTO users (name, email, password, age, weight, height) VALUES
('John Doe', 'john@example.com', 'hashedpassword123', 28, 75.5, 175.0),
('Jane Smith', 'jane@example.com', 'hashedpassword456', 32, 65.0, 160.0);
`);
    })
    .then(() => {
      return db.query(`INSERT INTO fasting_sessions (user_id, start_time, end_time) VALUES
(1, '2024-02-07 20:00:00', '2024-02-08 12:00:00'),
(2, '2024-02-06 18:00:00', '2024-02-07 10:00:00');
`);
    })
    .then(() => {
      return db.query(`INSERT INTO meals (user_id, meal_name, calories) VALUES
(1, 'Oatmeal with Banana', 250),
(1, 'Grilled Chicken Salad', 400),
(2, 'Protein Shake', 300);
`);
    })
    .then(() => {
      return db.query(`INSERT INTO calories (user_id, daily_goal) VALUES
(1, 2000),
(2, 1800);
`);
    })
    .then(() => {
      return db.query(`INSERT INTO streaks (user_id, current_streak, longest_streak, last_fast_date) VALUES
(1, 3, 5, '2024-02-08'),
(2, 2, 4, '2024-02-07');
`);
    })
    .then(() => {
      console.log("Database seeded successfully");
    })
    .catch((err) => {
      console.error(`Error seeding database: ${err}`);
    });
};

module.exports = seed;
