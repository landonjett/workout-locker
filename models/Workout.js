const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model {}

Workout.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('cardio', 'strength training', 'meditation'),
    allowNull: false,
  },
  // Make duration and caloriesBurned nullable for flexibility
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true, // Changed to true to accommodate different workout types
  },
  caloriesBurned: {
    type: DataTypes.INTEGER,
    allowNull: true, // Changed to true
  },
  // Add sets and reps for strength training workouts
  sets: {
    type: DataTypes.INTEGER,
    allowNull: true, // These can be null for non-strength training workouts
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Workout',
  freezeTableName: true,
  tableName: 'workouts',
  timestamps: true,
  underscored: true,
});

module.exports = Workout;
