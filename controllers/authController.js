const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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
      token: generateToken(user._id),
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
      token: generateToken(user._id),
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
      token: generateToken(user._id),
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
      token: generateToken(user._id),
    });
  }
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  console.log(req);
  const user = await User.findById(req.user._id);

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
    token: generateToken(updatedUser._id),
  });
});
