const CustomError = require("../utils/CustomError");
const asyncHandler = require("express-async-handler");

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new CustomError("Not authorized as an admin", 403);
  }
});

module.exports = admin;
