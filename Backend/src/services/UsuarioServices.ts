import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { Usuario } from "../core/models/Usuario";

export class UsuarioService {
  constructor(private usuarioRepo: UsuarioRepository) {}

  /**
   * Crear un usuario nuevo
   */
  async crearUsuario(data: {
    empresa_id: number;
    nombre: string;
    email: string;
    password: string;
    rolId: number;
  }): Promise<Usuario> {
    // 1) Revisar si el email ya existe en esa empresa
    const existe = await this.usuarioRepo.findByEmail(data.empresa_id, data.email);
    if (existe) {
      throw new Error("El email ya está registrado en esta empresa");
    }

    // 2) Hashear la contraseña
    const passwordHash = await bcrypt.hash(data.password, 10);

    // 3) Crear instancia del modelo Usuario
    const nuevoUsuario = new Usuario({
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
  async obtenerPorEmail(empresa_id: number, email: string): Promise<Usuario | null> {
    return await this.usuarioRepo.findByEmail(empresa_id, email);
  }

  /**
   * Validación de credenciales
   */
  async validarCredenciales(empresa_id: number, email: string, password: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findByEmail(empresa_id, email);
    if (!usuario) throw new Error("Usuario no encontrado");

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) throw new Error("Contraseña incorrecta");

    return usuario;
  }
}
