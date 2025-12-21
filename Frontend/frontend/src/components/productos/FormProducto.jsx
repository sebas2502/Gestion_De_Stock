import { useState,useEffect } from "react";
import { toast } from "react-toastify";

export default function FormularioProducto({
  categorias,
  onSubmit,
  editando,
  datosIniciales
}) {
  const [formData, setFormData] = useState(
    datosIniciales ?? {
      codigo: "",
      categoria_id: "",
      nombre: "",
      descripcion: "",
      precio: "",
      stock_minimo: ""
    }
  );

useEffect(() => {
  if (
    editando &&
    datosIniciales &&
    categorias.length > 0
  ) {
    setFormData({
      codigo: datosIniciales.codigo ?? "",
      categoria_id: String(datosIniciales.categoria_id ?? ""),
      nombre: datosIniciales.nombre ?? "",
      descripcion: datosIniciales.descripcion ?? "",
      precio: datosIniciales.precio ?? "",
      stock_minimo: datosIniciales.stock_minimo ?? ""
    });
  }
}, [editando, datosIniciales, categorias]);



  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productoFinal = {
      codigo: formData.codigo || null,
      categoria_id: Number(formData.categoria_id),
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion || null,
      precio: Number(formData.precio),
      stock_minimo: Number(formData.stock_minimo)
    };

    if (productoFinal.stock_minimo < 0) {
      toast.error("❌ El stock mínimo no puede ser negativo");
      return;
    }

    onSubmit(productoFinal);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-gray-900 p-4 rounded-xl border border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {/* Código */}
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Código</label>
        <input
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      {/* Categoría */}
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Categoría</label>
        <select
          name="categoria_id"
          value={formData.categoria_id}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Nombre */}
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Nombre</label>
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Descripción</label>
        <input
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      {/* Precio */}
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Precio</label>
        <input
          type="number"
          step="0.01"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      {/* Stock mínimo */}
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-gray-400">Stock mínimo</label>
        <input
          type="number"
          name="stock_minimo"
          value={formData.stock_minimo}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      <button
        type="submit"
        className="sm:col-span-3 bg-green-600 hover:bg-green-700 py-2 rounded"
      >
        {editando ? "Guardar Cambios" : "Agregar Producto"}
      </button>
    </form>
  );
}
