import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { RolMiddleware } from "../middlewares/RolMiddleware";
import { ProductoRepository } from "../repositories/ProductoRepository";
import { ProductoServices } from "../services/ProductoServices";
import { ProductoController } from "../controllers/ProductoController";

const repo = new ProductoRepository();
const service = new ProductoServices(repo);
const controller = new ProductoController(service);

const router = Router();


router.get("/", AuthMiddleware, controller.listar);
router.get("/:id", AuthMiddleware, controller.obtener);

// Solo administradores pueden crear, editar y borrar
router.post("/", AuthMiddleware, RolMiddleware([1]), controller.crear);
router.put("/:id", AuthMiddleware, RolMiddleware([1]), controller.actualizar);
router.put("/desactivar/:id", AuthMiddleware, RolMiddleware([1]), controller.eliminar);

export default router;
