const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  muscleGroups: {
    type: [String],
  },
  equipment: {
    type: [String],
  },
  photoUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);
