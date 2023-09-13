const mongoose = require("mongoose");

const CodeSnippetSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
  },
});

const CodeSnippet = new mongoose.model("CodeSnippet", CodeSnippetSchema);

module.exports = CodeSnippet;
