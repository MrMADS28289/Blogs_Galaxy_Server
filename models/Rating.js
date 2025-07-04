const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
stars: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model("Rating", ratingSchema);