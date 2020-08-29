const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Exercise = require("../../models/Exercise");

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      level = ".*",
      type = ".*",
      equipment = ".*",
      muscleGroups = ".*",
    } = req.query;

    const exercises = await Exercise.find({
      $and: [
        { level: { $regex: level } },
        { type: { $regex: type } },
        { equipment: { $elemMatch: { $regex: equipment } } },
        { muscleGroups: { $elemMatch: { $regex: muscleGroups } } },
      ],
    });
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/exercises/:id
// @desc    Get exercise by exercise ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    res.json(exercise);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route   POST api/exercises
// @desc    Create a new exercise
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const newExercise = new Exercise({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      level: req.body.level,
      type: req.body.type,
      muscleGroups: req.body.muscleGroups,
      equipment: req.body.equipment,
      photoUrl: req.body.photoUrl,
      videoUrl: req.body.videoUrl,
    });

    const exercise = newExercise.save();

    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/exercises/:id
// @desc    Edit an exercise
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedExercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          user: req.user.id,
          name: req.body.name,
          description: req.body.description,
          level: req.body.level,
          type: req.body.type,
          muscleGroups: req.body.muscleGroups,
          equipment: req.body.equipment,
          photoUrl: req.body.photoUrl,
          videoUrl: req.body.videoUrl,
        },
      }
    );

    res.json(updatedExercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/exercises/:id
// @desc    Delete an exercise
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    // Check user
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await exercise.remove();

    res.json({ msg: "Exercise removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
