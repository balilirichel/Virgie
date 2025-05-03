// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const role = localStorage.getItem("role");

  return role === "1" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
