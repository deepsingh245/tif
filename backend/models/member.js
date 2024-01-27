const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const newUser = mongoose.model("member", UserSchema, "member");
module.exports = newUser;
