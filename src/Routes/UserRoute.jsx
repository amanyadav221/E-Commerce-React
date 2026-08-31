import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserRoute() {

  const { jwt, role } = useSelector(s => s.LoginStateData);
  if (!jwt) return <Navigate to="/login" replace />;
  if (role !== "USER") return <Navigate to="/" replace />;

  return <Outlet />
}
