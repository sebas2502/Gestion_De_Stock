"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const DashboardServices_1 = require("../services/DashboardServices");
class DashboardController {
    constructor() {
        this.service = new DashboardServices_1.DashboardServices();
        this.getDashboard = this.getDashboard.bind(this);
    }
    async getDashboard(req, res) {
        try {
            const empresa_id = req.user.empresa_id;
            const data = await this.service.getDashboardData(empresa_id);
            return res.json(data);
        }
        catch (error) {
            console.error("Error en el controlador del dashboard:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.DashboardController = DashboardController;
