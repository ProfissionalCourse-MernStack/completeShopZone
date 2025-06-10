const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// Get all users
router.get("/", getAllUsers);

// Register a new user
router.post("/register", registerUser);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

module.exports = router;
