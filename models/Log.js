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
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  weight: {
    type: Number,
  },
});

module.exports = Log = mongoose.model("log", LogSchema);
