import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { MovimientosController } from "../controllers/MovimientoController";
import { MovimientosService } from "../services/MovimientoServices";
import { MovimientosRepository } from "../repositories/MovimientoRepository";
import { pool } from "../config/db";



const router = Router();

const repo = new MovimientosRepository(pool);
const service = new MovimientosService(repo);
const controller = new MovimientosController(service);

// Crear movimiento
router.post("/", AuthMiddleware, controller.crearMovimiento);


// Listar todos
router.get("/", AuthMiddleware, controller.listarTodos);

// Listar por producto
router.get(
  "/producto/:id",
  AuthMiddleware,
  controller.listarPorProducto
);

//Filtrar por rango de fechas
router.get("/filtrar", AuthMiddleware, controller.buscar);


export default router;
