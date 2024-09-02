import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated) return <Navigate to="/" replace />;

  // Verificar si el rol del usuario está permitido para acceder a la ruta
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/homePage" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

