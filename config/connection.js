require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // For production environment
  : new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, { // For development environment
    host: 'root',
    dialect: 'mysql',
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  timezone: '+00:00' // Adjust this to your MySQL server's timezone if necessary
});


module.exports = sequelize;
