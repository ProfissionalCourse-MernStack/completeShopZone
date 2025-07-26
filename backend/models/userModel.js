const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name must be less than 50 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s\-'\.]+$/.test(v);
      },
      message: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [100, 'Password must be less than 100 characters'],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profilePicture: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // 🔑 Add these two fields below
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
