const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Route for user registration
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword // Store the hashed password in the database
    });

    // Set up session variables upon successful registration
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(201).json(newUser); // Respond with the newly created user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); // Generic error message for server errors
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password' }); // Incorrect email
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password' }); // Incorrect password
      return;
    }

    // Set up session variables upon successful login
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({ user: userData, message: 'You are now logged in' }); // Successful login
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); // Generic error message for server errors
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end(); // No content response upon successful logout
    });
  } else {
    res.status(404).json({ message: 'User not logged in' }); // User not logged in
  }
});

module.exports = router;
