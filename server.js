const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ });

// Session middleware
const sess = {
  secret: 'Super secret secret',
  cookie: {
    secure: false 
  },
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};
app.use(session(sess));

// Handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// View routes
const viewRoutes = require('./routes/viewRoutes');
app.use('/', viewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;
