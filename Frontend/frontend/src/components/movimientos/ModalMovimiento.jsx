import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function ModalMovimiento({ open, onClose, onSuccess, usuario }) {
  // No renderizar el modal si está cerrado
  if (!open) return null;

  const [form, setForm] = useState({
    producto_id: "",
    tipo: "entrada",
    cantidad: "",
    total: "",
    descripcion: ""
  });

  const [productos, setProductos] = useState([]);

  // Cargar productos al abrir el modal
  useEffect(() => {
    const cargarProductos = async () => {
      const res = await api.get("/productos");
      setProductos(res.data);
    };
    cargarProductos();
  }, []);

  // Resetear formulario cada vez que se abre el modal
  useEffect(() => {
    if (open) {
      setForm({
        producto_id: "",
        tipo: "entrada",
        cantidad: "",
        total: "",
        descripcion: ""
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };

    // Recalcular total si cambia producto o cantidad
    if (name === "producto_id" || name === "cantidad") {
      const producto = productos.find(p => p.id === Number(newForm.producto_id));
      if (producto && Number(newForm.cantidad) > 0) {
        newForm.total = Number(newForm.cantidad) * producto.precio;
      } else {
        newForm.total = "";
      }
    }

    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que haya un usuario antes de enviar
    if (!usuario) {
      toast.error("No se encontró el usuario actual.");
      return;
    }

    const data = {
      ...form,
      producto_id: Number(form.producto_id),
      cantidad: Number(form.cantidad),
      total: Number(form.total),
      usuario_id: usuario.id // <- enviamos el usuario que realiza el movimiento
    };

    try {
      
      await api.post("/movimientos", data);
      toast.success("Movimiento creado correctamente");
      onSuccess();
      onClose();
    } catch (error) {
      
      toast.error("No se pudo crear el movimiento.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md text-white">
        <h3 className="text-lg mb-1 font-semibold">Nuevo movimiento</h3>
        <p className="text-sm text-gray-400 mb-4">
          Usuario: {usuario?.nombre || "Desconocido"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="producto_id"
            value={form.producto_id}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          >
            <option value="">Seleccionar producto</option>
            {productos.length === 0 ? (
              <option disabled>Cargando productos...</option>
            ) : (
              productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - ${p.precio}
                </option>
              ))
            )}
          </select>

          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          >
            <option value="entrada">Ingreso</option>
            <option value="salida">Egreso</option>
          </select>

          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={form.cantidad}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          />

          <input
            type="number"
            name="total"
            placeholder="Total $"
            value={form.total}
            readOnly
            className="w-full p-2 rounded bg-gray-700/50 border border-gray-700 cursor-not-allowed"
          />

          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
