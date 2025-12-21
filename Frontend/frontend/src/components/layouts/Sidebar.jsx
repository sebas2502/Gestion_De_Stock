import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  LogOut,
  User,
  Warehouse
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg my-2 font-medium transition
    ${
      pathname === path
        ? "bg-gray-700 text-white shadow"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
        <div className="flex items-center gap-3 mb-8">
        <Warehouse size={28} className="text-blue-400" />
        <h1 className="text-xl font-bold">Gestión de Stock</h1>
      </div>
      <h1 className="text-xl font-bold mb-8">Gestión Stock</h1>

      <nav className="flex-1">
        <Link className={linkClass("/")} to="/">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link className={linkClass("/productos")} to="/productos">
          <Package size={20} />
          Productos
        </Link>

        <Link className={linkClass("/movimientos")} to="/movimientos">
          <ArrowLeftRight size={20} />
          Movimientos
        </Link>
      </nav>

      {/* USUARIO */}
      <div className="mt-4 mb-3 px-3 py-2 bg-gray-800 rounded-lg flex items-center gap-3">
        <User size={20} />
        <div className="text-sm">
          <p className="font-semibold text-green-400">
            {usuario?.nombre}
          </p>
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        style={{cursor:"pointer"}}
        className="mt-auto w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg flex items-center justify-center gap-3 font-semibold"
      >
        <LogOut size={20} />
        Cerrar sesión
      </button>
    </aside>
  );
};

export default Sidebar;
