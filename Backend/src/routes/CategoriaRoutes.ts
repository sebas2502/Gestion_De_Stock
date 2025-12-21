import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { RolMiddleware } from "../middlewares/RolMiddleware";

import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { CategoriaServices } from "../services/CategoriaServices";
import { CategoriaController } from "../controllers/CategoriaController";

const repo = new CategoriaRepository();
const service = new CategoriaServices(repo);
const controller = new CategoriaController(service);

const router = Router();

router.get("/", AuthMiddleware, controller.listar);
router.get("/:id", AuthMiddleware, controller.obtener);

router.post("/", AuthMiddleware, RolMiddleware([1]), controller.crear);
router.put("/:id", AuthMiddleware, RolMiddleware([1]), controller.actualizar);
router.delete("/:id", AuthMiddleware, RolMiddleware([1]), controller.eliminar);

export default router;
