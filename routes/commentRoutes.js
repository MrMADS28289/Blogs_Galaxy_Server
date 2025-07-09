const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   POST /api/comments
// @desc    Create a new comment
// @access  Private
router.post("/", authMiddleware, commentController.createComment);

// @route   GET /api/comments/blog/:blogId
// @desc    Get all comments for a specific blog
// @access  Public
router.get("/blog/:blogId", commentController.getCommentsByBlog);

// @route   PUT /api/comments/:id
// @desc    Update a comment
// @access  Private
router.put("/:id", authMiddleware, commentController.updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;