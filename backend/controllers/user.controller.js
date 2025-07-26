const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// GET all users with search and pagination support
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    
    let query = {};
    if (search) {
      // Search in name, email, and role fields
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { role: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const total = await User.countDocuments(query);
    
    // Get users with pagination and search
    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit);
    
    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    res.json({
      docs: users,
      totalDocs: total,
      limit: limit,
      totalPages: totalPages,
      page: page,
      pagingCounter: skip + 1,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST - Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists (optional but recommended)
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword, // save hashed password here
      role,
    });
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user and token in expected format
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET - Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - Update user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE - Remove user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user statistics
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });
    const userCount = await User.countDocuments({ role: "user" });
    const adminPercentage = totalUsers ? Math.round((adminCount / totalUsers) * 100) : 0;
    const userPercentage = totalUsers ? Math.round((userCount / totalUsers) * 100) : 0;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    res.json({
      data: {
        totalUsers,
        adminCount,
        adminPercentage,
        userCount,
        userPercentage,
        recentUsers,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserProfile,
  updateUser,
  deleteUser,
  getUserStats,
};
