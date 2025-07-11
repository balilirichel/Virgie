// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = () => {
  const role = localStorage.getItem("role");

  return role === "1" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRouteAdmin;
