const express = require('express');
const router = express.Router();
const { User, Workout } = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

// Route to display the homepage
// If the user is already logged in, they're redirected to the dashboard
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('home', { layout: 'main' });
});

// Route to display the dashboard
// This route is protected, only accessible to logged-in users
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('home', { layout: 'main' });
});

// Route to display the dashboard
// This route is protected, only accessible to logged-in users
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    // Fetch user's workouts from the database
    const workoutData = await Workout.findAll({
      where: {
        userId: req.session.userId
      }
    });

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      layout: 'main',
      workouts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Export routes for server.js to use
module.exports = router;







