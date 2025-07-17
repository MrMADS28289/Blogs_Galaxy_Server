const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleSignIn,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validationMiddleware");

router.post("/register", ...validateRegistration, register);
router.post("/login", ...validateLogin, login);
router.post("/google-signin", googleSignIn);
router.put("/profile", protect, updateUserProfile);
router.get("/users", protect, getAllUsers);
router.put("/users/:id/role", protect, admin, updateUserRole);
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;
