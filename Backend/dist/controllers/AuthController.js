"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthServices_1 = require("../services/AuthServices");
const UsuarioRepository_1 = require("../repositories/UsuarioRepository");
const AppError_1 = require("../errors/AppError");
const usuarioRepo = new UsuarioRepository_1.UsuarioRepository();
const authService = new AuthServices_1.AuthService(usuarioRepo);
class AuthController {
    static async login(req, res) {
        try {
            const { nombre_empresa, email, password } = req.body;
            const data = await authService.login(nombre_empresa, email, password);
            res.json(data);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async me(req, res) {
        try {
            const usuarioId = req.user.id;
            const empresaId = req.user.empresa_id;
            const usuario = await authService.obtenerUsuarioActual(usuarioId, empresaId);
            return res.json(usuario);
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}
exports.AuthController = AuthController;
