const express = require('express');
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Serve the homepage
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('home');
  }
});

// Serve the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

// Serve the signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('signup');
  }
});

// Handle user signup
router.post('/signup', (req, res) => {
  // Logic for user signup
});

// Serve the dashboard page
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// Handle user logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Logout failed');
    } else {
      res.redirect('/'); // Redirect to the homepage after logout
    }
  });
});

module.exports = router;
