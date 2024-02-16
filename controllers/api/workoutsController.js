const express = require('express');
const router = express.Router();
const { Workout } = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

// Route to add a new workout for the logged-in user
router.post('/add', isAuthenticated, async (req, res) => {
  try {
    // Add check to ensure the user is logged in
    if (!req.session.userId) {
      res.status(403).json({ message: 'Must be logged in to add workouts!' });
      return;
    }

    const newWorkout = await Workout.create({
      type: req.body.type,
      duration: req.body.duration,
      caloriesBurned: req.body.caloriesBurned,
      userId: req.session.userId // Associate the workout with the logged-in user
    });

    res.json(newWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Route to get workouts for the logged-in user
router.get('/user', isAuthenticated, async (req, res) => {
  try {
    // Add check to ensure the user is logged in
    if (!req.session.userId) {
      res.status(403).json({ message: 'Must be logged in to view workouts!' });
      return;
    }

    const userWorkouts = await Workout.findAll({
      where: {
        userId: req.session.userId // Only fetch workouts for the logged-in user
      }
    });

    res.json(userWorkouts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
