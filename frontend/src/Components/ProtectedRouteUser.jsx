// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteUser = () => {
  const role = localStorage.getItem("role");

  return role === "0" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRouteUser;
