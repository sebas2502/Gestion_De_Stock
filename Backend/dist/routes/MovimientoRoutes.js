"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const MovimientoController_1 = require("../controllers/MovimientoController");
const MovimientoServices_1 = require("../services/MovimientoServices");
const MovimientoRepository_1 = require("../repositories/MovimientoRepository");
const db_1 = require("../config/db");
const router = (0, express_1.Router)();
const repo = new MovimientoRepository_1.MovimientosRepository(db_1.pool);
const service = new MovimientoServices_1.MovimientosService(repo);
const controller = new MovimientoController_1.MovimientosController(service);
// Crear movimiento
router.post("/", AuthMiddleware_1.AuthMiddleware, controller.crearMovimiento);
// Listar todos
router.get("/", AuthMiddleware_1.AuthMiddleware, controller.listarTodos);
// Listar por producto
router.get("/producto/:id", AuthMiddleware_1.AuthMiddleware, controller.listarPorProducto);
//Filtrar por rango de fechas
router.get("/filtrar", AuthMiddleware_1.AuthMiddleware, controller.buscar);
exports.default = router;
