import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    if (!toast.isActive("auth")) {
      toast.warning("Debes iniciar sesión para acceder", {
        toastId: "auth",
        position: "top-center",
        theme: "dark",
      });
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

