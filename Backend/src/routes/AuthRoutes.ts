import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

// LOGIN
router.post("/login", AuthController.login);
router.get("/getUser" , AuthMiddleware, AuthController.me);


export default router;
