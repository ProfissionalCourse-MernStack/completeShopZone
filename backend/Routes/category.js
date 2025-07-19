const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const {
  verifyToken,
  allowOnlyAdmin,
} = require("../middleWares/authMiddleware");

// ✅ Public route - Get all categories
router.get("/", getAllCategories);

// ✅ Public route - Get single category
router.get("/:id", getCategoryById);

// ✅ Admin only - Create category
router.post("/", verifyToken, allowOnlyAdmin, createCategory);

// ✅ Admin only - Update category
router.put("/:id", verifyToken, allowOnlyAdmin, updateCategory);

// ✅ Admin only - Delete category
router.delete("/:id", verifyToken, allowOnlyAdmin, deleteCategory);

module.exports = router;
