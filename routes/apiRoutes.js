const express = require('express');
const router = express.Router();
const { User, Workout } = require('../models');
const bcrypt = require('bcrypt');

// Route for user registration
router.post('/users/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for user login
router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for user logout
router.post('/users/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: 'Could not log out, please try again' });
      } else {
        res.status(200).send('Logout successful');
      }
    });
  } else {
    res.status(200).send('No session to log out from');
  }
});

// Updated Route for adding a workout to include the 'name' field
router.post('/workouts', async (req, res) => {
  try {
    const { name, type, duration, calories } = req.body; // Include 'name' in the destructuring
    const userId = req.session.userId; // Extract userId from the session

    if (!userId) {
      return res.status(403).json({ error: 'User not logged in' });
    }

    if (!name || !type || !duration || isNaN(calories)) { // Check for 'name' as well
      return res.status(400).json({ error: 'All fields are required, including the workout name.' });
    }

    const newWorkout = await Workout.create({
      name, // Save the 'name' along with other workout details
      type,
      duration,
      caloriesBurned: calories,
      userId,
    });

    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).json({ error: 'Server error during workout creation' });
  }
});

// Route for fetching all workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.findAll();
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
