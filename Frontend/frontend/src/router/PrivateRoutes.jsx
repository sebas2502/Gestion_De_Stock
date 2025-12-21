import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { usuario, loading } = useAuth();

  

  if (loading){
    return (
       <div className="w-screen h-screen flex items-center justify-center text-white">
        Cargando sesión...
      </div>
    )
  }; 

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
