// orders.routes.js

const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/order.controller");

router.post("/", orderController.createOrder); // إرسال طلب جديد

module.exports = router;
