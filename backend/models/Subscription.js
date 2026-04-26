const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  cost: Number,
  renewalDate: Date,
  category: String
});

module.exports = mongoose.model("Subscription", schema);