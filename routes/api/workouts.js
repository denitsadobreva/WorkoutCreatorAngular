const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Workout = require("../../models/Workout");

// @route   GET api/workouts
// @desc    List all workouts of current user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/workouts/:id
// @desc    Get workout by workout ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ msg: "Workout not found" });
    }

    res.json(workout);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route   POST api/workouts
// @desc    Create a new workout
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const newWorkout = new Workout({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      exercises: req.body.exercises,
    });

    const workout = newWorkout.save();

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/workouts/:id
// @desc    Edit a workout by workout ID
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          user: req.user.id,
          name: req.body.name,
          description: req.body.description,
          exercises: req.body.exercises,
        },
      }
    );

    res.json(updatedWorkout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/workouts/:id
// @desc    Delete a workout by workout ID
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ msg: "Workout not found" });
    }

    // Check user
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await workout.remove();

    res.json({ msg: "Workout removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
