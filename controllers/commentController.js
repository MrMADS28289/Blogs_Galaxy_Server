const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { text, blogId } = req.body;
    const author = req.user.id; // Assuming user ID is available from authentication middleware

    const newComment = new Comment({
      text,
      author,
      blog: blogId,
    });

    const comment = await newComment.save();

    // Optionally, you might want to update the Blog model to include comment count or last comment
    // For now, we'll just save the comment.

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get comments for a specific blog
exports.getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate("author", "username").sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Optional: Update a comment
exports.updateComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Ensure user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to update this comment" });
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Optional: Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Ensure user is the author of the comment or an admin
    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};