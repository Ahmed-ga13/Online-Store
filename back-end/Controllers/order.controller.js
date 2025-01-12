// orders.controller.js

const Order = require("../Models/order.model");

exports.createOrder = (req, res) => {
  const { customer, products } = req.body;

  const newOrder = new Order({
    customer,
    products,
    status: "Pending", // حالة الطلب
    createdAt: new Date(),
  });

  newOrder
    .save()
    .then((order) => {
      res.status(201).json({
        message: "Order created successfully!",
        order,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};
