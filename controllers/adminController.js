const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");

exports.getAnalytics = asyncHandler(async (req, res) => {
  const totalBlogs = await Blog.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalComments = await Comment.countDocuments();

  res.json({
    totalBlogs,
    totalUsers,
    totalComments,
  });
});
