import { useEffect, useState } from "react";
import { Plus, ArrowLeftRight, Search, X } from "lucide-react";

import ModalMovimiento from "../components/movimientos/ModalMovimiento";
import { obtenerMovimientos, filtrarMovimientos } from "../services/movimientosServices";

import { useAuth } from "../context/AuthContext";

export default function Movimientos() {

  const usuario = useAuth();

  const [movimientos, setMovimientos] = useState([]);
  const [open, setOpen] = useState(false);

  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const cargarMovimientos = async () => {
    const data = await obtenerMovimientos();
    setMovimientos(data);
  };

  const buscarPorFecha = async () => {
    if (!desde || !hasta) {
      alert("Seleccioná ambas fechas");
      return;
    }

    const data = await filtrarMovimientos(desde, hasta);
    setMovimientos(data);
  };

  const limpiarFiltro = async () => {
    setDesde("");
    setHasta("");
    cargarMovimientos();
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

  return (
    <div className="p-6 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        
        <h2 className="text-2xl flex items-center gap-2 font-semibold">
          <ArrowLeftRight size={20} /> Movimientos
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          <Plus size={18} />
          Nuevo movimiento
        </button>
      </div>

      {/* FILTRO POR FECHAS */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-end">

        <div className="flex flex-col">
          <label className="text-sm">Desde</label>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="bg-gray-700 p-2 rounded text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Hasta</label>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="bg-gray-700 p-2 rounded text-white"
          />
        </div>

        <button
          onClick={buscarPorFecha}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          <Search size={18} />
          Buscar
        </button>

        <button
          onClick={limpiarFiltro}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <X size={18} />
          Limpiar
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">Fecha</th>
              <th className="p-3">Producto</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Descripcion</th>
              <th className="p-3">Usuario</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((m) => (
              <tr key={m.id} className="border-t border-gray-700 text-center">
                <td className="p-2">{new Date(m.fecha).toLocaleDateString()}</td>
                <td className="p-2">{m.producto_nombre}</td>
                <td className={`p-2 font-semibold ${m.tipo === "entrada" ? "text-green-400" : "text-red-400"}`}>
                  {m.tipo}
                </td>
                <td className="p-2">{m.cantidad}</td>
                <td className="p-2">{m.descripcion}</td>
                <td className="p-2">{m.usuario_nombre}</td>
                <td className="p-2">$ {m.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ModalMovimiento
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={cargarMovimientos}
        usuario={usuario}
      />
    </div>
  );
}
