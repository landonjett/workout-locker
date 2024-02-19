'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Make sure this path correctly points to your Sequelize connection setup file

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50), // Matching the schema definition
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255), // Matching the schema definition
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures the email is valid
    },
  },
  password: {
    type: DataTypes.STRING(255), // Matching the schema definition
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Ensure default values are in line with your database defaults
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW, // Sequelize handles this automatically if timestamps are true
  },
}, {
  sequelize, // Pass the connection instance
  modelName: 'User',
  tableName: 'users', // Explicitly specify the table name to match your database
  timestamps: true, // Enable Sequelize to automatically manage createdAt and updatedAt
  createdAt: 'created_at', // Map the createdAt attribute to the column name in the database
  updatedAt: 'updated_at', // Map the updatedAt attribute to the column name in the database
  freezeTableName: true, // Prevent Sequelize from pluralizing the table name
});

module.exports = User;