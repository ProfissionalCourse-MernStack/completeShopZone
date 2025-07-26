const express = require("express");
const router = express.Router();
const {
  uploadProfilePicture,
  deleteProfilePicture,
} = require("../controllers/profilePicture.controller");
const { verifyToken } = require("../middleWares/authMiddleware");

// Profile picture routes
router.post("/upload", verifyToken, uploadProfilePicture);
router.delete("/", verifyToken, deleteProfilePicture);

module.exports = router; 