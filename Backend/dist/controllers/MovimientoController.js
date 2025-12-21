"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovimientosController = void 0;
class MovimientosController {
    constructor(movimientosService) {
        this.movimientosService = movimientosService;
        this.crearMovimiento = async (req, res) => {
            try {
                const { producto_id, tipo, cantidad, descripcion, fecha, total } = req.body;
                const empresa_id = req.user.empresa_id;
                const usuario_id = req.user.id;
                console.log("datos user:");
                console.log(usuario_id + " " + empresa_id);
                const result = await this.movimientosService.crearMovimiento(empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total);
                return res.json({ success: true, movimiento_id: result.id });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        };
        this.listarTodos = async (req, res) => {
            try {
                const empresa_id = Number(req.user.empresa_id);
                const movimientos = await this.movimientosService.listarTodos(empresa_id);
                return res.json(movimientos);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        };
        this.listarPorProducto = async (req, res) => {
            try {
                const empresa_id = req.user.empresa_id;
                const producto_id = Number(req.params.productoId);
                const movimientos = await this.movimientosService.listarPorProducto(empresa_id, producto_id);
                return res.json(movimientos);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        };
        this.buscar = async (req, res) => {
            try {
                console.log(req);
                const empresa_id = req.query.empresa_id
                    ? Number(req.query.empresa_id)
                    : undefined;
                const desde = req.query.desde ? String(req.query.desde) : undefined;
                const hasta = req.query.hasta ? String(req.query.hasta) : undefined;
                console.log("Fechas: " + desde + " " + hasta);
                const movimientos = await this.movimientosService.buscar(empresa_id, desde, hasta);
                return res.json(movimientos);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Error al filtrar movimientos" });
            }
        };
    }
    async getKpis(req, res) {
        try {
            const data = await this.movimientosService.getKpis();
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error obteniendo KPIs' });
        }
    }
}
exports.MovimientosController = MovimientosController;
