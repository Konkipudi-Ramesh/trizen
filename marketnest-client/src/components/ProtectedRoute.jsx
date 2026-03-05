import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If user not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If role required but user role is different
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}