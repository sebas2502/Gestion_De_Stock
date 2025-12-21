"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Usuario_1 = require("../core/models/Usuario");
class UsuarioService {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    /**
     * Crear un usuario nuevo
     */
    async crearUsuario(data) {
        // 1) Revisar si el email ya existe en esa empresa
        const existe = await this.usuarioRepo.findByEmail(data.empresa_id, data.email);
        if (existe) {
            throw new Error("El email ya está registrado en esta empresa");
        }
        // 2) Hashear la contraseña
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        // 3) Crear instancia del modelo Usuario
        const nuevoUsuario = new Usuario_1.Usuario({
            empresa_id: data.empresa_id,
            nombre: data.nombre,
            email: data.email,
            passwordHash,
            rolId: data.rolId,
            estado: 1, // por defecto activo
        });
        // 4) Guardar en DB
        const insertId = await this.usuarioRepo.create(nuevoUsuario);
        nuevoUsuario.id = insertId;
        return nuevoUsuario;
    }
    /**
     * Obtener un usuario por email + empresa (para login)
     */
    async obtenerPorEmail(empresa_id, email) {
        return await this.usuarioRepo.findByEmail(empresa_id, email);
    }
    /**
     * Validación de credenciales
     */
    async validarCredenciales(empresa_id, email, password) {
        const usuario = await this.usuarioRepo.findByEmail(empresa_id, email);
        if (!usuario)
            throw new Error("Usuario no encontrado");
        const ok = await bcryptjs_1.default.compare(password, usuario.password);
        if (!ok)
            throw new Error("Contraseña incorrecta");
        return usuario;
    }
}
exports.UsuarioService = UsuarioService;
