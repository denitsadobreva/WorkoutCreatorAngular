const express = require("express");
const router = express.Router();

// @route   GET api/logs
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Logs route"));

module.exports = router;
