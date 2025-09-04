import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, useContext } from "react";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import { AuthContext } from "../context/AuthContext";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));
const UserLayout = lazy(() => import("../layouts/UserLayout"));
// const StaffLayout = lazy(() => import("../layouts/StaffLayout"));
// const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/user/dashboard" replace /> : <Home />} />
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/user/dashboard" replace /> : <Auth />} />

      {/* Protected User Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute allowedRoles={["user"]} />}>
          <Route path="/user/*" element={<UserLayout />} />
          <Route path="/user/dashboard" element={<UserLayout />} />
        </Route>

        {/* Protected Staff Routes */}

      </Route>
    </Routes>
  );
}
