export class Producto {
  id?: number;
  empresa_id: number;
  categoria_id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stock_minimo: number;
  codigo: string;
  activo: number;
  fecha_creacion: Date;

  constructor(data: any) {
    this.id = data.id;
    this.empresa_id = data.empresa_id;
    this.categoria_id = data.categoria_id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.precio = data.precio;
    this.stock = data.stock;
    this.stock_minimo = data.stock_minimo;
    this.codigo = data.codigo;
    this.activo = data.activo;
    this.fecha_creacion = data.fecha_creacion;
  }
}
