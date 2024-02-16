const router = require('express').Router();
const userRoutes = require('./userRoutes');
const workoutsRoutes = require('./workoutsRoutes');

router.use('/users', userRoutes);
router.use('/workouts', workoutsRoutes);

module.exports = router; 