"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = (0, express_1.Router)();
// LOGIN
router.post("/login", AuthController_1.AuthController.login);
router.get("/getUser", AuthMiddleware_1.AuthMiddleware, AuthController_1.AuthController.me);
exports.default = router;
