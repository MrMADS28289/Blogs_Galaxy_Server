const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

const WEBSITE_CONTEXT = `
This is a blogging platform called "Blogs Galaxy".

Features:
- User Authentication: Secure user registration and login.
- Blog Post Management: Create, read, update, and delete blog posts (Admin).
- Categorized Content: Browse blog posts by different categories.
- Interactive UI: Engaging user interface with 3D models and animations.
- Responsive Design: Optimized for various screen sizes.
- Comments System: Users can comment on blog posts.
- Admin Dashboard: Tools for managing users, blogs, and comments.

Technologies Used:
- Frontend: Next.js, React, Jotai, Framer Motion, React Three Drei & Fiber, Tailwind CSS
- Backend/Database: Firebase (Authentication, Firestore Database)

Key areas for improvement:
- Security: Migrate authentication token storage from localStorage to more secure HTTP-only cookies.
- TypeScript Adoption: Enforce strict type checking and migrate all .js and .jsx files to .tsx.
- Performance Optimization: Ensure next/image components have width/height, virtualization for long lists, use React.memo, useCallback, useMemo.
- Code Structure & Readability: Centralize API error handling, extract complex logic, consistent API response structures.
- Best Practices: Enhance ESLint configuration.

When answering questions about the website, use the information provided above.
`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateContent = asyncHandler(async (req, res) => {
  const { prompt, blogId } = req.body;

  let fullPrompt = "";

  if (blogId) {
    // Handle blog summarization request for a specific blog ID
    const blog = await Blog.findById(blogId);
    if (!blog || !blog.content) {
      res.status(404).json({ error: "Blog not found or content unavailable." });
      return;
    }
    fullPrompt = `Please summarize the following blog post content:\n\n${blog.content}\n\nProvide a concise summary.`;
  } else if (prompt && prompt.toLowerCase().includes("give me a blog")) {
    // Handle "give me a blog" request
    const allBlogs = await Blog.find({}); // Fetch all blogs
    if (!allBlogs || allBlogs.length === 0) {
      res
        .status(200)
        .json({ text: "Sorry, I couldn't find any blogs at the moment." });
      return;
    }
    const randomBlog = allBlogs[Math.floor(Math.random() * allBlogs.length)];
    // Ensure randomBlog has title and id properties
    if (
      !randomBlog ||
      !randomBlog.title ||
      !randomBlog._id ||
      !randomBlog.content
    ) {
      res
        .status(200)
        .json({
          text: "Sorry, I found a blog but it's missing some details (title, ID, or content).",
        });
      return;
    }
    res
      .status(200)
      .json({
        text: `Here's a random blog for you: "${randomBlog.title}"\n\nContent:\n${randomBlog.content}`,
      });
    return;
  } else if (
    prompt &&
    prompt.toLowerCase().includes("summarize a random blog")
  ) {
    // Handle "summarize a random blog" request
    const allBlogs = await Blog.find({}); // Fetch all blogs
    if (!allBlogs || allBlogs.length === 0) {
      res
        .status(200)
        .json({
          text: "Sorry, I couldn't find any blogs to summarize at the moment.",
        });
      return;
    }
    const randomBlog = allBlogs[Math.floor(Math.random() * allBlogs.length)];
    if (!randomBlog || !randomBlog.content) {
      res
        .status(200)
        .json({
          text: `Sorry, the random blog "${
            randomBlog.title || "unknown"
          }" does not have content available for summarization.`,
        });
      return;
    }
    fullPrompt = `Please summarize the following blog post content:\n\n${randomBlog.content}\n\nProvide a concise summary.`;
  } else if (prompt) {
    // Handle general website questions
    fullPrompt = `${WEBSITE_CONTEXT}\n\nUser query: ${prompt}`;
  } else {
    res.status(400).json({ error: "Prompt or blogId is required" });
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using gemini-pro as gemini-1.5-flash might not be available or needed
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

module.exports = { generateContent };
