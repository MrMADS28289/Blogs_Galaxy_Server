const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/gemini", require("./routes/geminiRoutes"));

// Health check route
app.get("/api/health", (req, res) => {
  res.send("Server is healthy");
});

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
