const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request
      req.user = decoded;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new CustomError("Not authorized, token failed", 401);
    }
  }

  if (!token) {
    res.status(401);
    throw new CustomError("Not authorized, no token", 401);
  }
});

module.exports = protect;
