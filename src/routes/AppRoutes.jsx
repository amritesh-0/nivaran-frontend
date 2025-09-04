import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import UserLayout from "../layouts/UserLayout";
// import StaffLayout from "../layouts/StaffLayout";
// import AdminLayout from "../layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected User Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute allowedRoles={["user"]} />}>
          <Route path="/user/*" element={<UserLayout />} />
        </Route>

        {/* Protected Staff Routes */}
        
      </Route>
    </Routes>
  );
}