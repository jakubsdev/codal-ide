const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["cpp"],
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  output: {
    type: String,
  },
  status: {
    type: String,
    default: "Compilation in progress..",
    enum: [
      "Compilation in progress..",
      "Compilation successful",
      "Compilation failed",
    ],
  },
});

const Job = new mongoose.model("Job", JobSchema);

module.exports = Job;
