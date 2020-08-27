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

module.exports = router;
