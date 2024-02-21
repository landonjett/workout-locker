const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const router = express.Router();

const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use(session(sess));// Session middleware

// Handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// API routes
const apiRoutes = require('./routes/apiroutes');
app.use('/api', apiRoutes);

// View routes
const viewRoutes = require('./routes/viewroutes');
app.use('/', viewRoutes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = router;
});