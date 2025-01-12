// order.model.js

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
    phone: String,
  },
  products: [
    {
      id: Number,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  status: String, // حالة الطلب مثل Pending أو Completed
  createdAt: Date,
});

module.exports = mongoose.model("Order", orderSchema);
