const Order = require("../models/order");

// ✅ Create Order (user)
const createOrder = async (req, res) => {
  try {
    let { products } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must contain at least one product." });
    }

    // Format each product to match schema: { product, quantity }
    products = products.map((item) => {
      if (typeof item === "string" || typeof item === "number") {
        return { product: item, quantity: 1 };
      }
      return {
        product: item.product,
        quantity: item.quantity || 1,
      };
    });

    const order = new Order({
      user: req.user._id, // From verifyToken middleware
      products,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get order by ID (admin or user)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Restrict access if not admin and not the owner of the order
    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
};
