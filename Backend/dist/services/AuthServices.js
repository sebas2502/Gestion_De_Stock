"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
const db_1 = require("../config/db");
const AppError_1 = require("../errors/AppError");
class AuthService {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    async login(nombre_empresa, email, password) {
        const [row] = await db_1.pool.query("SELECT * FROM empresas WHERE nombre = ?", [nombre_empresa]);
        const empresa = row[0];
        if (!empresa) {
            throw new Error("La empresa ingresada no existe!");
        }
        const user = await this.usuarioRepo.findByEmail(Number(empresa.id), email);
        if (!user)
            throw new Error("Usuario no encontrado");
        const ok = await bcryptjs_1.default.compare(password, user.password);
        if (!ok)
            throw new Error("Contraseña incorrecta");
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            empresa_id: user.empresa_id,
            rolId: user.rolId,
        }, jwtConfig_1.jwtSecret, jwtConfig_1.jwtOptions);
        return { token, user };
    }
    async obtenerUsuarioActual(id, empresa_id) {
        const usuario = await this.usuarioRepo.findById(id, empresa_id);
        if (!usuario) {
            throw new AppError_1.AppError("Usuario no encontrado", 401);
        }
        return usuario;
    }
}
exports.AuthService = AuthService;
