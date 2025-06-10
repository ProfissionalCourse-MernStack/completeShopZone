// 1. Import Required Modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/auth.route");

// 2. Load Environment Variables
dotenv.config();

// 3. Connect to MongoDB
connectDB();

// 4. Initialize Express App
const app = express();

// 5. Middleware to Parse JSON
app.use(express.json());

// 6. API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// 7. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
