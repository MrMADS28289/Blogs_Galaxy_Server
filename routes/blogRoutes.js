const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const auth = require("../middleware/authMiddleware");
const { validateBlogCreation, validateBlogUpdate, validateBlogRating } = require("../middleware/validationMiddleware");

// Create a blog (Authenticated)
router.post("/", auth, ...validateBlogCreation, blogController.createBlog);

// Get all blogs (Public)
router.get("/", blogController.getAllBlogs);

// Get a single blog by ID (Public)
router.get("/:id", blogController.getBlogById);

// Update blog (Authenticated & Owner)
router.put("/:id", auth, ...validateBlogUpdate, blogController.updateBlog);

// Delete blog (Authenticated & Owner)
router.delete("/:id", auth, blogController.deleteBlog);

// Rate a blog (Authenticated)
router.post("/:id/rate", auth, ...validateBlogRating, blogController.rateBlog);

module.exports = router;
