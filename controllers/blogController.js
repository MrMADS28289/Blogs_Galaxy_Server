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
    // Populate the author field before sending the response
    const populatedBlog = await Blog.findById(blog._id).populate(
      "author",
      "name avatar"
    );
    res.status(201).json(populatedBlog);
  } else {
    res.status(400);
    throw new CustomError("Invalid blog data", 400);
  }
});

// Get all blogs
exports.getAllBlogs = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query; // Extract category, page, and limit from query parameters
  let query = {};

  if (category) {
    query.category = category; // Add category to query if provided
  }

  const skip = (page - 1) * limit;

  const blogs = await Blog.find(query)
    .populate("author", "name avatar")
    .populate("ratings")
    .populate("likedBy") // Populate likedBy field
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip)
    .limit(parseInt(limit));

  const totalBlogs = await Blog.countDocuments(query);

  res.status(200).json({
    blogs,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalBlogs / limit),
    totalBlogs,
  });
});

// Get single blog
exports.getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("author", "name avatar")
    .populate("ratings")
    .select("+likes")
    .populate("likedBy"); // Populate likedBy field

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
  const { action } = req.body;
  const blogId = req.params.id;
  const userId = req.user.id;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new CustomError("Blog not found", 404);
  }

  const userLikedIndex = blog.likedBy.findIndex(
    (id) => id.toString() === userId
  );
  const isLiked = userLikedIndex !== -1;

  if (action === "like") {
    if (!isLiked) {
      blog.likes += 1;
      blog.likedBy.push(userId);
    }
  } else if (action === "unlike") {
    if (isLiked) {
      blog.likes = Math.max(0, blog.likes - 1);
      blog.likedBy.splice(userLikedIndex, 1);
    }
  } else {
    res.status(400);
    throw new CustomError("Invalid action", 400);
  }

  await blog.save();
  res.json({ likes: blog.likes, isLiked: !isLiked });
});
