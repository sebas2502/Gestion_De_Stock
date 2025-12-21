"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const ProductoRoutes_1 = __importDefault(require("./routes/ProductoRoutes"));
const MovimientoRoutes_1 = __importDefault(require("./routes/MovimientoRoutes"));
const DashboardRoutes_1 = __importDefault(require("./routes/DashboardRoutes"));
const db_1 = require("./config/db");
const CategoriaRoutes_1 = __importDefault(require("./routes/CategoriaRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", AuthRoutes_1.default);
app.use("/api/productos", ProductoRoutes_1.default);
app.use("/api/movimientos", MovimientoRoutes_1.default);
app.use("/api/dashboard", DashboardRoutes_1.default);
app.use("/api/categorias", CategoriaRoutes_1.default);
app.get("/api/empresas/", async (req, res) => {
    try {
        const rows = await db_1.pool.query("SELECT * FROM empresas");
        res.json(rows);
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
app.use(errorMiddleware_1.errorMiddleware);
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado en puerto 3000");
});
