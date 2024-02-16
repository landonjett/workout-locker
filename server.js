const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// Handlebars setup
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// API routes
const apiRoutes = require('./routes/apiroutes');
app.use('/api', apiRoutes);

// View routes
const viewRoutes = require('./routes/viewroutes');
app.use('/', viewRoutes);

// Serve static files (like CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
