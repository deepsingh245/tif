const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  community: {
    type: String,
  },
  user: {
    type: String,
  },
  role: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const newUser = mongoose.model("role", UserSchema, "role");
module.exports = newUser;
