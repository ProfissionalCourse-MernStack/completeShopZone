const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

// Configure multer for file uploads
const multer = require("multer");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Upload profile picture
const uploadProfilePicture = async (req, res) => {
  try {
    // Use multer middleware
    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const userId = req.user.id; // From auth middleware
      const imageUrl = `/uploads/${req.file.filename}`;

      // Update user profile picture
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: imageUrl },
        { new: true }
      ).select("-password");

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        profilePicture: imageUrl,
        user: updatedUser,
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading profile picture" });
  }
};

// Get profile picture
const getProfilePicture = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const user = await User.findById(userId).select("profilePicture");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.profilePicture) {
      return res.status(404).json({ message: "No profile picture found" });
    }

    const imagePath = path.join(__dirname, "..", user.profilePicture);
    
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image file not found" });
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error("Get profile picture error:", error);
    res.status(500).json({ message: "Error retrieving profile picture" });
  }
};

// Delete profile picture
const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profilePicture) {
      // Delete file from filesystem
      const imagePath = path.join(__dirname, "..", user.profilePicture);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Update user to remove profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: null },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile picture deleted successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Delete profile picture error:", error);
    res.status(500).json({ message: "Error deleting profile picture" });
  }
};

module.exports = {
  uploadProfilePicture,
  getProfilePicture,
  deleteProfilePicture,
}; 