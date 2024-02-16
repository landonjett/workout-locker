const router = require('express').Router();
const { Workout } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
