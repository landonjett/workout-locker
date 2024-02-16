DROP DATABASE IF EXISTS workouts_db;

CREATE DATABASE workouts_db;

-- Use the database
USE workouts_db;

-- Example table creation: Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Example table creation: Workouts
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('cardio', 'strength training', 'meditation') NOT NULL,
    duration INT NOT NULL,
    calories_burned INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);