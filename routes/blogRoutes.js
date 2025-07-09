const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const auth = require("../middleware/authMiddleware");

// Create a blog (Authenticated)
router.post("/", auth, blogController.createBlog);

// Get all blogs (Public)
router.get("/", blogController.getAllBlogs);

// Get a single blog by ID (Public)
router.get("/:id", blogController.getBlogById);

// Update blog (Authenticated & Owner)
router.put("/:id", auth, blogController.updateBlog);

// Delete blog (Authenticated & Owner)
router.delete("/:id", auth, blogController.deleteBlog);

// Rate a blog (Authenticated)
router.post("/:id/rate", auth, blogController.rateBlog);

module.exports = router;
