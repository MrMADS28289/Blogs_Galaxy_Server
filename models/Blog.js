const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
title: String,
content: String,
coverImage: String,
category: String,
tags: [String],
author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
likes: { type: Number, default: 0 },
views: { type: Number, default: 0 },
trending: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);