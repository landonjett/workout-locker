module.exports = function(req, res, next) {
  // Check if the user is logged in by looking for a flag in the session
  if (req.session.loggedIn) {
    // If logged in, proceed to the next middleware or route handler
    next();
  } else {
    // If not logged in, redirect to the login page or send an error message
    // If your application uses server-side rendering, you might redirect:
    // res.redirect('/login');

    // If your application is more API-focused (e.g., for a SPA or mobile app), you might send a JSON response:
    res.status(401).json({ message: 'User not authenticated. Please log in to access this resource.' });
  }
};
