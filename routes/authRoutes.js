const express = require("express");
const router = express.Router();
const { register, login, googleSignIn, updateUserProfile } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const { validateRegistration, validateLogin } = require("../middleware/validationMiddleware");

router.post("/register", ...validateRegistration, register);
router.post("/login", ...validateLogin, login);
router.post("/google-signin", googleSignIn);
router.put("/profile", protect, updateUserProfile);

module.exports = router;