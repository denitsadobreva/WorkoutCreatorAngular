const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: "workout",
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  measurements: {
    weight: {
      type: Number,
    },
    bicep: {
      type: Number,
    },
    chest: {
      type: Number,
    },
    waist: {
      type: Number,
    },
    hips: {
      type: Number,
    },
    thigh: {
      type: Number,
    },
    calf: {
      type: Number,
    },
  },
});

module.exports = Log = mongoose.model("log", LogSchema);
