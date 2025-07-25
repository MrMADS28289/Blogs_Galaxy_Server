const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: false },
    image: String,
    role: { type: String, default: "user" },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
