const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
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

// ✅ Get one order (user/admin)
router.get("/:id", verifyToken, getOrderById);

module.exports = router;
