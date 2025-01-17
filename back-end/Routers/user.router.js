// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");
const authMW = require("../utili/auth");

// مسار للحصول على المستخدمين
router.get("/", authMW.authMW, userController.getUsers); // محمي بـ JWT Middleware

// مسار لإنشاء مستخدم جديد
router.post("/", userController.createUser);

// مسار لتسجيل الدخول
router.post("/login", userController.login);

module.exports = router;
