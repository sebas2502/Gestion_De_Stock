import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/AuthRoutes";
import productoRouter from "./routes/ProductoRoutes";
import movimientoRouter from "./routes/MovimientoRoutes";
import dashboardRouter from "./routes/DashboardRoutes";
import { Request , Response } from "express";
import { pool } from "./config/db";
import categoriasRouter from "./routes/CategoriaRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { testDBConnection } from "./config/db";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://gestiondestocksw.netlify.app", 
  credentials: true
}));
app.use(express.json());
const PORT = process.env.PORT;

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


(async () => {
  const ok = await testDBConnection();
  if (!ok) {
    console.error("No se pudo conectar a la DB, saliendo...");
    process.exit(1); // Railway mostrará el error en logs y no dará 502
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();