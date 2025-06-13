const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");

// Create OrderItem
const createOrderItem = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const productData = await Product.findById(product);
    if (!productData) return res.status(404).json({ message: "Product not found" });

    const price = productData.price;
    const orderItem = await OrderItem.create({ product, quantity, price });

    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all OrderItems
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find().populate("product", "name price");
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single OrderItem
const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id).populate("product");
    if (!orderItem) return res.status(404).json({ message: "Order item not found" });
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update OrderItem
const updateOrderItem = async (req, res) => {
  try {
    const updated = await OrderItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete OrderItem
const deleteOrderItem = async (req, res) => {
  try {
    await OrderItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Order item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem, // ✅ Now it's safe to export
  deleteOrderItem,
};
