const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Log = require("../../models/Log");

// @route   GET api/logs
// @desc    Test route
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/logs/:id
// @desc    Test route
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: "Log not found" });
    }

    res.json(log);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route   POST api/logs
// @desc    Create a new log
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const newLog = new Log({
      user: req.user.id,
      workout: req.body.workout,
      notes: req.body.notes,
      date: req.body.date,
      measurements: req.body.measurements,
    });

    const log = newLog.save();

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/logs/:id
// @desc    Edit a log
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedLog = await Log.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          user: req.user.id,
          workout: req.body.workout,
          notes: req.body.notes,
          date: req.body.date,
          measurements: req.body.measurements,
        },
      }
    );

    res.json(updatedLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/logs/:id
// @desc    Delete a log
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: "Log not found" });
    }

    // Check user
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await log.remove();

    res.json({ msg: "Log removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
