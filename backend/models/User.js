const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
    require: true,
    unique: true,
  },
  displayName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
