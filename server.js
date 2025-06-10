// 1. Import Required Modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import Routes
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/auth.route");
const products = require("./Routes/product");
const categoryRoutes = require("./Routes/category");

// 2. Load .env Variables
dotenv.config();

// 3. Connect to MongoDB
connectDB();

// 4. Initialize Express App
const app = express();

// 5. Middleware to parse JSON
app.use(express.json());

// 6. Routes
app.use("/api/users", userRoutes); // For admin to manage users
app.use("/api/auth", authRoutes); // For login & register
app.use("/api/products", products);
app.use("/api/categories", categoryRoutes);

// 7. Basic Test Route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// 8. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
