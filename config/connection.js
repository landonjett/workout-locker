const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'root',
    dialect: 'mysql',
    port: 3306,
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
