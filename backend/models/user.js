const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required:true
  },

  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const newUser = mongoose.model("user", UserSchema,"user");
module.exports = newUser;
