const Blog = require("../models/Blog");
const Rating = require("../models/Rating");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError");

// Create a new blog
exports.createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user.id,
  });
  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400);
    throw new CustomError("Invalid blog data", 400);
  }
});

// Get all blogs
exports.getAllBlogs = asyncHandler(async (req, res) => {
  const { category } = req.query; // Extract category from query parameters
  let query = {};

  if (category) {
    query.category = category; // Add category to query if provided
  }

  const blogs = await Blog.find(query)
    .populate("author", "name avatar")
    .populate("ratings"); // Keep ratings for now, as per previous instruction
  res.status(200).json(blogs);
});

// Get single blog
exports.getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("author", "name avatar")
    .populate("ratings");

  if (!blog) {
    res.status(404);
    throw new CustomError("Blog not found", 404);
  }

  blog.views += 1;
  await blog.save();

  res.json(blog);
});

// Update a blog
exports.updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new CustomError("Blog not found", 404);
  }
  if (blog.author.toString() !== req.user.id) {
    res.status(403);
    throw new CustomError("Unauthorized", 403);
  }

  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete a blog
exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new CustomError("Blog not found", 404);
  }
  if (blog.author.toString() !== req.user.id) {
    res.status(403);
    throw new CustomError("Unauthorized", 403);
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

// Rate a blog
exports.rateBlog = asyncHandler(async (req, res) => {
  const { stars } = req.body;
  const blogId = req.params.id;

  const existing = await Rating.findOne({
    user: req.user.id,
    blog: blogId,
  });

  if (existing) {
    existing.stars = stars;
    await existing.save();
  } else {
    await Rating.create({
      user: req.user.id,
      blog: blogId,
      stars,
    });
  }

  const updatedBlog = await Blog.findById(blogId).populate("ratings");
  res.json(updatedBlog);
});
