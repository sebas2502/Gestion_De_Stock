"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const RolMiddleware_1 = require("../middlewares/RolMiddleware");
const ProductoRepository_1 = require("../repositories/ProductoRepository");
const ProductoServices_1 = require("../services/ProductoServices");
const ProductoController_1 = require("../controllers/ProductoController");
const repo = new ProductoRepository_1.ProductoRepository();
const service = new ProductoServices_1.ProductoServices(repo);
const controller = new ProductoController_1.ProductoController(service);
const router = (0, express_1.Router)();
router.get("/", AuthMiddleware_1.AuthMiddleware, controller.listar);
router.get("/:id", AuthMiddleware_1.AuthMiddleware, controller.obtener);
// Solo administradores pueden crear, editar y borrar
router.post("/", AuthMiddleware_1.AuthMiddleware, (0, RolMiddleware_1.RolMiddleware)([1]), controller.crear);
router.put("/:id", AuthMiddleware_1.AuthMiddleware, (0, RolMiddleware_1.RolMiddleware)([1]), controller.actualizar);
router.put("/desactivar/:id", AuthMiddleware_1.AuthMiddleware, (0, RolMiddleware_1.RolMiddleware)([1]), controller.eliminar);
exports.default = router;
