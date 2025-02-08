-- USERS TABLE (Stores user profiles)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age INT,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FASTING SESSIONS (Stores fasting history per user)
CREATE TABLE fasting_sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration INTERVAL GENERATED ALWAYS AS (end_time - start_time) STORED,
    success BOOLEAN DEFAULT TRUE
);

-- MEALS TABLE (Stores logged meals)
CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    meal_name VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    meal_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CALORIE GOALS (Tracks daily calorie intake goal)
CREATE TABLE calories (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    daily_goal INT NOT NULL,
    current_intake INT DEFAULT 0,
    date DATE DEFAULT CURRENT_DATE
);

-- WEIGHTS TABLE (Tracks weight changes)
CREATE TABLE weights (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    weight DECIMAL(5,2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- STREAKS TABLE (Tracks fasting streaks)
CREATE TABLE streaks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_fast_date DATE
);
