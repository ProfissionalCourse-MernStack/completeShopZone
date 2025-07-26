// 1. Import Required Modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Import Routes
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/auth.route");
const products = require("./Routes/product");
const categoryRoutes = require("./Routes/category");
const orderItemRoutes = require("./Routes/OrderItem");
const orderRoutes = require("./Routes/order.route");
const passwordRoutes = require("./Routes/passwordRoutes");
const profilePictureRoutes = require("./Routes/profilePicture");

// 2. Load .env Variables
dotenv.config();

// 3. Connect to MongoDB
connectDB();

// 4. Initialize Express App
const app = express();
app.use(
  cors({
    origin: "*", // Allow all origins
  })
); // Enable CORS for all routes

// 5. Middleware to parse JSON
app.use(express.json());

// 6. Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 7. Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", products);
app.use("/api/categories", categoryRoutes);
app.use("/api/order-items", orderItemRoutes); // ✅ Register here
app.use("/api/orders", orderRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api/profile-picture", profilePictureRoutes);

// 8. Basic Test Route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// 9. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
