import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { MovimientosController } from "../controllers/MovimientoController";
import { MovimientosService } from "../services/MovimientoServices";
import { MovimientosRepository } from "../repositories/MovimientoRepository";
import { pool } from "../config/db";

const router = Router();
const controller = new DashboardController();

const movRepo = new MovimientosRepository(pool);
const movServices = new MovimientosService(movRepo);
const movController = new MovimientosController(movServices);

router.get("/", AuthMiddleware, controller.getDashboard);
router.get("/Kpis" , AuthMiddleware , movController.getKpis.bind(movController))

export default router;
