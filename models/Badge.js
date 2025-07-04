const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
name: String,
icon: String,
condition: String, // e.g. "5 blogs", "1000 views"
});

module.exports = mongoose.model("Badge", badgeSchema);