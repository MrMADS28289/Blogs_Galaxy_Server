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

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
res.json({ token, user });
};