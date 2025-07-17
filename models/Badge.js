const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: String,
  icon: String,
  condition: String,
});

module.exports = mongoose.model("Badge", badgeSchema);
