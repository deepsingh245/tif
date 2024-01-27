const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const newUser = mongoose.model("role", UserSchema, "role");
module.exports = newUser;
