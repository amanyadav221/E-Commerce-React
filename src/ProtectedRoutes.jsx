// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoutes({ role, children }) {
//     const { jwt, role: userRole } = useSelector(s => s.SecurityCheckStateData);

//     if (!jwt) return <Navigate to="/login" />;
//     if (role && role !== userRole) return <Navigate to="/403" />;

//     return children;
// }
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({ role }) {
  const { jwt, role: userRole } = useSelector(state => state.SecurityCheckStateData);

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}


