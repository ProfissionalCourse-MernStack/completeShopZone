// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   price: { type: Number, required: true },
//   stock: { type: Number, default: 0 },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
// });

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },

  // ✅ Save category as name directly
  category: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
