const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  verifyToken,
  allowOnlyAdmin,
} = require("../middleWares/authMiddleware");

// ✅ Create product (admin only)
router.post("/", verifyToken, allowOnlyAdmin, createProduct);

// ✅ Get all products (public)
router.get("/", getAllProducts);

// ✅ Get one product
router.get("/:id", getProductById);

// ✅ Update (admin only)
router.put("/:id", verifyToken, allowOnlyAdmin, updateProduct);

// ✅ Delete (admin only)
router.delete("/:id", verifyToken, allowOnlyAdmin, deleteProduct);

module.exports = router;
