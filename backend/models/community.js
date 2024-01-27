const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  id: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  slug: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
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

const newCommunity = mongoose.model("community", CommunitySchema,"community");
module.exports = newCommunity;
