import {
  Package,
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { getProductos } from "../services/productosServices";
import { obtenerMovimientos } from "../services/movimientosServices";
import { topProductos } from "../services/movimientosServices";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalMovimientos, setTotalMovimientos] = useState(0);
  const [productosBajoStock, setProductosBajoStock] = useState(0);

  const [topMasVendidos, setTopMasVendidos] = useState([]);
  const [topMenosVendidos, setTopMenosVendidos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const prod = await getProductos();
        const mov = await obtenerMovimientos();
        const top = await topProductos();

        setTotalProductos(prod.length);
        setTotalMovimientos(mov.length);

        // Stock bajo
        const bajoStock = prod.filter(
          (p) => p.stock <= p.stock_minimo
        ).length;
        setProductosBajoStock(bajoStock);

        // Top productos
        setTopMasVendidos(top.mas_vendidos || []);
        setTopMenosVendidos(top.menos_vendidos || []);

      } catch (error) {
        console.log("Error cargando dashboard:", error);
      }
    };

    cargarDatos();
  }, []);

  // ================= Charts Config =================

  const dataMasVendidos = {
    labels: topMasVendidos.map((p) => p.nombre),
    datasets: [
      {
        label: "Unidades vendidas",
        data: topMasVendidos.map((p) => p.total_vendido),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  };

  const dataMenosVendidos = {
    labels: topMenosVendidos.map((p) => p.nombre),
    datasets: [
      {
        label: "Unidades vendidas",
        data: topMenosVendidos.map((p) => p.total_vendido),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  // ==================================================

  return (
    <div className="text-white mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <LayoutDashboard size={32} /> Dashboard
        </h2>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:scale-[1.02] transition">
          <div className="bg-blue-600/20 p-4 rounded-xl">
            <Package className="text-blue-400" size={32} />
          </div>
          <div>
            <p className="text-gray-400">Total Productos</p>
            <h3 className="text-3xl font-bold">{totalProductos}</h3>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:scale-[1.02] transition">
          <div className="bg-green-600/20 p-4 rounded-xl">
            <ClipboardList className="text-green-400" size={32} />
          </div>
          <div>
            <p className="text-gray-400">Movimientos</p>
            <h3 className="text-3xl font-bold">{totalMovimientos}</h3>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:scale-[1.02] transition">
          <div className="bg-red-600/20 p-4 rounded-xl">
            <AlertTriangle className="text-red-400" size={32} />
          </div>
          <div>
            <p className="text-gray-400">Stock Bajo</p>
            <h3 className="text-3xl font-bold">{productosBajoStock}</h3>
          </div>
        </div>

      </div>

      {/* CHART: MAS VENDIDOS */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-10">
        <h3 className="text-xl font-semibold mb-4">Top 3 productos más vendidos</h3>
        <Bar data={dataMasVendidos} />
      </div>

      {/* CHART: MENOS VENDIDOS */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Top 3 productos menos vendidos</h3>
        <Bar data={dataMenosVendidos} />
      </div>
    </div>
  );
}
