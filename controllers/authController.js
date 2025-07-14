const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new CustomError("User already exists", 400);
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new CustomError("Invalid user data", 400);
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401);
    throw new CustomError("Invalid email or password", 401);
  }
});

exports.googleSignIn = asyncHandler(async (req, res) => {
  const { name, email, image } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    // User exists, log them in
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    // User does not exist, create a new one
    user = new User({
      name,
      email,
      image,
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  }
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new CustomError("User not found", 404);
  }

  user.role = role || user.role;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image,
    role: updatedUser.role,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new CustomError("User not found", 404);
  }

  await user.deleteOne();

  res.json({ message: "User removed" });
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new CustomError("User not found", 404);
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.image = image || user.image;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image,
    role: updatedUser.role,
    token: generateToken(updatedUser._id, updatedUser.role),
  });
});
