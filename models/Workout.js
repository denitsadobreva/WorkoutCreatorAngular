const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  exercises: [
    {
      exercise: {
        type: Schema.Types.ObjectId,
        ref: "exercise",
      },
      sets: {
        type: Number,
        required: true,
      },
      reps: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Workout = mongoose.model("workout", WorkoutSchema);
