import { useEffect, useState } from "react";
import { Building2, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { getEmpresas } from "../../services/empresasServices";

export default function FormLogin() {
  const [formData, setFormData] = useState({
    nombre_empresa: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  const navigate = useNavigate();
  const { login, usuario, loading: authLoading } = useAuth(); // 👈 CLAVE

  /* 🔐 Si ya está logueado, afuera del login */
  useEffect(() => {
    if (!authLoading && usuario) {
      navigate("/", { replace: true });
    }
  }, [usuario, authLoading, navigate]);

  useEffect(() => {
    const cargarEmpresas = async () => {
      try {
        const res = await getEmpresas();
        setEmpresas(res.data);
      } catch (error) {
        console.error("Error cargando empresas:", error);
      }
    };

    cargarEmpresas();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        nombre_empresa: formData.nombre_empresa.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      const token = res.data.token;
      const user = res.data.usuario || res.data.user; // defensivo

      if (!token || !user) {
        throw new Error("Respuesta de login inválida");
      }

      login(token, user);

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Credenciales incorrectas"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-center text-white mb-6">
        Iniciar Sesión
      </h2>

      {/* EMPRESA */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-1">Empresa</label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            name="nombre_empresa"
            value={formData.nombre_empresa}
            onChange={handleChange}
            className="w-full pl-10 p-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none"
            required
          />
        </div>
      </div>

      {/* EMAIL */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 p-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none"
            required
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-1">Contraseña</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 p-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none"
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white disabled:opacity-50"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
