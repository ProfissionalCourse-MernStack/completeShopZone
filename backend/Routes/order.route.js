const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
} = require("../controllers/order.controller");

const {
  verifyToken,
  allowOnlyAdmin,
  allowOnlyUser,
} = require("../middleWares/authMiddleware");

// ✅ Create order (user)
router.post("/", verifyToken, allowOnlyUser, createOrder);

// ✅ Get all orders (admin)
router.get("/", verifyToken, allowOnlyAdmin, getAllOrders);

// ✅ Get user's orders (authenticated user) - MUST come before /:id route
router.get("/user/orders", verifyToken, getUserOrders);

// ✅ Get one order (user/admin) - MUST come after specific routes
router.get("/:id", verifyToken, getOrderById);

module.exports = router;
