import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@application/context/AuthContext";

/**
 * Envuelve rutas que requieren autenticación.
 * Si el usuario no está autenticado y la sesión ya se cargó,
 * redirige a /auth usando `replace` para que el botón "Atrás"
 * no vuelva a la página protegida.
 */
const PrivateRoute = () => {
  const { usuario, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <p style={{ color: "#aaa", fontSize: "1rem" }}>Cargando...</p>
      </div>
    );
  }

  return usuario ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
