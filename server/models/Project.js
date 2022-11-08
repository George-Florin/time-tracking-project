const mongoose = require("mongoose");
const Time = require("./Time");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  times: {
    type: { type: [Time.schema], required: true },
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
