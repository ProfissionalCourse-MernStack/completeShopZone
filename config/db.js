const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URL from your environment variables
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
