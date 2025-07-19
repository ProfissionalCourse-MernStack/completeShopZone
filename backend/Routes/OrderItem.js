const express = require("express");
const router = express.Router();
const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/OrderItemController");

const {
  verifyToken,
  allowOnlyAdmin,
  allowOnlyUser,
} = require("../middleWares/authMiddleware");

// ✅ Create OrderItem (User only)
router.post("/", verifyToken, allowOnlyUser, createOrderItem);

// ✅ Get all OrderItems (Admin only)
router.get("/", verifyToken, allowOnlyAdmin, getAllOrderItems);

// ✅ Get single OrderItem (User or Admin)
router.get("/:id", verifyToken, getOrderItemById);

// ✅ Update OrderItem (User or Admin)
router.put("/:id", verifyToken, updateOrderItem);

// ✅ Delete OrderItem (User or Admin)
router.delete("/:id", verifyToken, deleteOrderItem);

module.exports = router;
