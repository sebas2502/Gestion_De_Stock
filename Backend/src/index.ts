import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "../src/routes/AuthRoutes";
import productoRouter from "../src/routes/ProductoRoutes";
import movimientoRouter from "../src/routes/MovimientoRoutes";
import dashboardRouter from "../src/routes/DashboardRoutes";
import { Request , Response } from "express";
import { pool } from "./config/db";
import categoriasRouter from "../src/routes/CategoriaRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth" , authRouter);
app.use("/api/productos" , productoRouter);
app.use("/api/movimientos" , movimientoRouter);
app.use("/api/dashboard" , dashboardRouter);
app.use("/api/categorias" , categoriasRouter);


app.get("/api/empresas/" , async (req : Request , res : Response) => {

  try {
    const rows = await pool.query("SELECT * FROM empresas");
    res.json(rows);
  } catch (error) {
    console.log("Error: ",error)
  }


})

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado en puerto 3000");
});
