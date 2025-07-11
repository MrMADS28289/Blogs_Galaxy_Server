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

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
console.log("Server running on http://localhost:5000");
});