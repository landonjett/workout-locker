const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model {}

Workout.init({
  // Model attributes are defined here
  name: { // Add this field to match the new column in your database
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  caloriesBurned: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Ensure this matches the table name in your database, which is typically plural
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Workout', // Ensure this is capitalized to match convention and is singular
  freezeTableName: true, // Prevents Sequelize from pluralizing the table name
  tableName: 'workouts', // Explicitly specify the table name to match your database
  timestamps: true,
  underscored: true,
});

module.exports = Workout;
