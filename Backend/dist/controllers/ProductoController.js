"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoController = void 0;
const AppError_1 = require("../errors/AppError");
class ProductoController {
    constructor(service) {
        this.service = service;
        this.listar = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const productos = await this.service.listar(empresa_id);
                res.json(productos);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        };
        this.obtener = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const id = Number(req.params.id);
                const prod = await this.service.obtener(empresa_id, id);
                res.json(prod);
            }
            catch (err) {
                res.status(404).json({ error: err.message });
            }
        };
        this.crear = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const { stock, stock_minimo } = req.body;
                if (stock < 0) {
                    return res.status(400).json({ error: "El stock no puede ser negativo" });
                }
                if (stock_minimo < 0) {
                    return res.status(400).json({ error: "El stock mínimo no puede ser negativo" });
                }
                const prod = await this.service.crear(empresa_id, req.body);
                res.json(prod);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        this.actualizar = async (req, res) => {
            try {
                console.log(req.body);
                const empresa_id = req.user.empresa_id;
                const id = Number(req.params.id);
                const { stock_minimo } = req.body;
                if (stock_minimo < 0) {
                    return res.status(400).json({ error: "El stock mínimo no puede ser negativo" });
                }
                const prod = await this.service.actualizar(id, empresa_id, req.body);
                res.json(prod);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message
                    });
                }
                res.status(500).json({
                    message: "Error interno del servidor"
                });
            }
        };
        this.eliminar = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const id = Number(req.params.id);
                await this.service.eliminar(id, empresa_id);
                res.json({ mensaje: "Producto eliminado" });
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message
                    });
                }
                res.status(500).json({
                    message: "Error interno del servidor"
                });
            }
        };
    }
}
exports.ProductoController = ProductoController;
