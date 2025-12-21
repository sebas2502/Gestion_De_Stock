"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolMiddleware = RolMiddleware;
const AppError_1 = require("../errors/AppError");
function RolMiddleware(rolesPermitidos) {
    return (req, res, next) => {
        if (!req.user) {
            throw new AppError_1.AppError("No autenticado", 401); // ✅ antes respondía
        }
        const rolUsuario = req.user.rolId;
        if (!rolesPermitidos.includes(rolUsuario)) {
            throw new AppError_1.AppError("No tenés permisos para realizar esta accion", 403); // ✅ antes respondía
        }
        next();
    };
}
