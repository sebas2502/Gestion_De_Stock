"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
class CategoriaController {
    constructor(service) {
        this.service = service;
        this.listar = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const data = await this.service.listar(empresa_id);
                res.json(data);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        };
        this.obtener = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const id = Number(req.params.id);
                const data = await this.service.obtener(empresa_id, id);
                res.json(data);
            }
            catch (err) {
                res.status(404).json({ error: err.message });
            }
        };
        this.crear = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const data = await this.service.crear(empresa_id, req.body);
                res.json(data);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        this.actualizar = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const id = Number(req.params.id);
                const data = await this.service.actualizar(empresa_id, id, req.body);
                res.json(data);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        this.eliminar = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const id = Number(req.params.id);
                await this.service.eliminar(empresa_id, id);
                res.json({ mensaje: "Categoría eliminada" });
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
    }
}
exports.CategoriaController = CategoriaController;
