const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  activity: {
    type: String,
  },
  date: {
    type: String,
  },
  duration: {
    type: String,
  },
  projectId: {
    type: String,
  },
});

module.exports = mongoose.model("Time", TimeSchema);
