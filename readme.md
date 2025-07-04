🔌 MongoDB Connection (config/db.js)

const mongoose = require("mongoose");

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");
} catch (error) {
console.error("MongoDB connection failed", error);
process.exit(1);
}
};

module.exports = connectDB;

🧠 Mongoose Models

models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
password: String,
avatar: String,
role: { type: String, default: "user" },
badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

models/Blog.js

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
title: String,
content: String,
coverImage: String,
category: String,
tags: [String],
author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
views: { type: Number, default: 0 },
trending: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);

models/Badge.js

const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
name: String,
icon: String,
condition: String, // e.g. "5 blogs", "1000 views"
});

module.exports = mongoose.model("Badge", badgeSchema);

models/Rating.js

const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
stars: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model("Rating", ratingSchema);

🧪 Auth Example (controllers/authController.js)

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
const { name, email, password } = req.body;
const hash = await bcrypt.hash(password, 10);

try {
const user = await User.create({ name, email, password: hash });
res.status(201).json(user);
} catch (err) {
res.status(400).json({ error: err.message });
}
};

exports.login = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user || !(await bcrypt.compare(password, user.password)))
return res.status(401).json({ error: "Invalid credentials" });

const token = jwt.sign({ id: user.\_id }, process.env.JWT_SECRET);
res.json({ token, user });
};

🔐 Middleware (middleware/authMiddleware.js)

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
const token = req.headers.authorization?.split(" ")[1];
if (!token) return res.status(403).json({ error: "Access denied" });

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
} catch (err) {
res.status(401).json({ error: "Invalid token" });
}
};

module.exports = auth;

🛣️ Routes (routes/authRoutes.js)

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;

🧪 Blog Route (routes/blogRoutes.js)

const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
const newBlog = await Blog.create({ ...req.body, author: req.user.id });
res.status(201).json(newBlog);
});

router.get("/", async (req, res) => {
const blogs = await Blog.find().populate("author");
res.json(blogs);
});

module.exports = router;

🖥️ server.js

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

app.listen(5000, () => {
console.log("Server running on http://localhost:5000");
});
