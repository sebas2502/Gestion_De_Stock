import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUsuario(null);
        setLoading(false);
        return;
      }

      try {
  const res = await api.get("/auth/getUser");
  setUsuario(res.data);
} catch (error) {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    setUsuario(null);
  }
} finally{
  setLoading(false)
}
    };

    verificarSesion();
  }, []);

  const login = (token, usuario) => {
    localStorage.setItem("token", token);
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
