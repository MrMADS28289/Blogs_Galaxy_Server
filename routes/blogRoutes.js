const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
const newBlog = await Blog.create({ ...req.body, author: req.user.id });
res.status(201).json(newBlog);
});

router.get("/", async (req, res) => {
const blogs = await Blog.find().populate("author");
res.json(blogs);
});

module.exports = router;