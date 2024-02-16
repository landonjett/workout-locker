const express = require('express');
const router = express.Router();
const path = require('path');
// Assuming you have a middleware to check if the user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Serve the homepage
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    // If using static HTML files
    res.sendFile(path.join(__dirname, '../public/login.html'));
    
    // If using Handlebars
    // res.render('home');
  }
});

// Serve the login page - might be redundant if '/' covers login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.join(__dirname, '../public/login.html'));
    // Or for Handlebars: res.render('login');
  }
});

// Serve the signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
    // Or for Handlebars: res.render('signup');
  }
});

// Serve the dashboard page - protected by isAuthenticated middleware
router.get('/dashboard', isAuthenticated, (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/dashboard.html')); // For static files
  res.render('dashboard', { user: req.session.user }); // Assuming you're passing the user session info to the template
});

module.exports = router;
