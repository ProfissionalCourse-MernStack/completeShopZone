const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  getUserStats, // <-- add this
} = require("../controllers/user.controller");

const {
  verifyToken, // Check if user is logged in
  allowOnlyAdmin, // Check if user is an admin
} = require("../middleWares/authMiddleware");

// ✅ Get all users (admin only)
router.get("/", verifyToken, allowOnlyAdmin, getAllUsers);

// ✅ Register a new user (open to everyone)
router.post("/register", registerUser);

// ✅ Update user by ID (admin only)
router.put("/:id", verifyToken, allowOnlyAdmin, updateUser);

// ✅ Delete user by ID (admin only)
router.delete("/:id", verifyToken, allowOnlyAdmin, deleteUser);

// ✅ Get user statistics (admin only)
router.get("/stats", verifyToken, allowOnlyAdmin, getUserStats);

module.exports = router;
