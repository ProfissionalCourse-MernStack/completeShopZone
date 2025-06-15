const Product = require("../models/product");

// ✅ Create new product (auto increase stock if exists)
const createProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    // Check if product with same name + category already exists
    let product = await Product.findOne({ name, category });

    if (product) {
      // ✅ Increase stock by 1 if it exists
      product.stock += 1;
      await product.save();
      return res.status(200).json(product);
    }

    // ✅ Create new product with stock = 1
    product = new Product({
      name,
      category,
      price,
      description,
      stock: 1,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // No populate needed
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get one product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
