const Blog = require("../models/Blog");
const Rating = require("../models/Rating");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      author: req.user.id,
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name avatar")
      .populate("ratings");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name avatar")
      .populate("ratings");

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rate a blog
exports.rateBlog = async (req, res) => {
  const { stars } = req.body;
  const blogId = req.params.id;

  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
