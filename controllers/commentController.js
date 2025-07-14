const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError");

// Create a new comment
exports.createComment = asyncHandler(async (req, res) => {
  const { text, blogId } = req.body;
  const author = req.user.id; // Assuming user ID is available from authentication middleware

  const newComment = new Comment({
    text,
    author,
    blog: blogId,
  });

  const comment = await newComment.save();

  if (comment) {
    res.status(201).json(comment);
  } else {
    res.status(400);
    throw new CustomError("Invalid comment data", 400);
  }
});

// Get comments for a specific blog
exports.getCommentsByBlog = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ blog: req.params.blogId })
    .populate("author", "name email")
    .sort({ createdAt: -1 });
  res.json(comments);
});

// Optional: Update a comment
exports.updateComment = asyncHandler(async (req, res) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new CustomError("Comment not found", 404);
  }

  // Ensure user is the author of the comment
  if (comment.author.toString() !== req.user.id) {
    res.status(401);
    throw new CustomError("Not authorized to update this comment", 401);
  }

  comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(comment);
});

// Optional: Delete a comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new CustomError("Comment not found", 404);
  }

  // Ensure user is the author of the comment or an admin
  if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new CustomError("Not authorized to delete this comment", 401);
  }

  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Comment removed" });
});

// Get all comments (Admin only)
exports.getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({})
    .populate("author", "name email")
    .populate("blog", "title")
    .sort({ createdAt: -1 });
  res.json(comments);
});
