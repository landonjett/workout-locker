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

// Route for adding a workout with conditional logic for workout type
router.post('/workouts/add', async (req, res) => {
  try {
    const { name, type, duration, caloriesBurned, sets, reps } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(403).json({ error: 'User not logged in' });
    }

    // Validate mandatory fields
    if (!name || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Initialize workoutData with fields applicable to all types
    let workoutData = { name, userId, type: type.toLowerCase() };

    // Append conditional fields based on workout type
    switch (workoutData.type) {
      case 'cardio':
        if (!duration || !caloriesBurned) {
          return res.status(400).json({ error: 'Missing required fields for cardio workout' });
        }
        workoutData.duration = duration;
        workoutData.caloriesBurned = caloriesBurned;
        break;
      case 'strength training':
        if (!sets || !reps) {
          return res.status(400).json({ error: 'Missing required fields for strength training workout' });
        }
        workoutData.sets = sets;
        workoutData.reps = reps;
        break;
      default:
        return res.status(400).json({ error: 'Invalid workout type' });
    }

    const newWorkout = await Workout.create(workoutData);
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).json({ error: 'Server error during workout creation' });
  }
});

// Route for fetching workouts for the logged-in user
router.get('/workouts/user', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(403).json({ error: 'User not logged in' });
    }

    const userWorkouts = await Workout.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.json(userWorkouts);
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for deleting a workout
router.delete('/workouts/delete/:id', async (req, res) => {
  try {
    const userId = req.session.userId;
    const workoutId = req.params.id;

    if (!userId) {
      return res.status(403).json({ error: 'User not logged in' });
    }

    // Check if the workout belongs to the logged-in user
    const workout = await Workout.findOne({ where: { id: workoutId, userId } });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Delete the workout
    await workout.destroy();

    res.status(204).end(); // No content response upon successful deletion
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
