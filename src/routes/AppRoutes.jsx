import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, useContext } from "react";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import { AuthContext } from "../context/AuthContext";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));
const Contact = lazy(() => import("../pages/Contact"));
const PrivacyPolicy = lazy(() => import("../pages/Privacy"));

const UserLayout = lazy(() => import("../layouts/UserLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const StaffLayout = lazy(() => import("../layouts/StaffLayout"));

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const IssueManagement = lazy(() => import("../pages/Admin/IssueManagement"));
const IssueDetail = lazy(() => import("../pages/Admin/IssueDetail"));
const StaffManagement = lazy(() => import("../pages/Admin/StaffManagement"));
const Analytics = lazy(() => import("../pages/Admin/Analytics"));
const AdminProfile = lazy(() => import("../pages/Admin/AdminProfile"));

const StaffDashboard = lazy(() => import("../pages/Staff/StaffDashboard"));
const StaffIssueManagement = lazy(() => import("../pages/Staff/StaffIssueManagement"));
const StaffIssueDetail = lazy(() => import("../pages/Staff/StaffIssueDetail"));
const StaffProfile = lazy(() => import("../pages/Staff/StaffProfile"));

// Lazy load User pages for nested routes
const Dashboard = lazy(() => import("../pages/User/Dashboard"));
const Profile = lazy(() => import("../pages/User/Profile"));
const RaiseProblem = lazy(() => import("../pages/User/RaiseProblem"));
const MyReports = lazy(() => import("../pages/User/MyReports"));
const LocalIssues = lazy(() => import("../pages/User/LocalIssues"));
const ReportDetail = lazy(() => import("../pages/User/ReportDetail"));
const Departments = lazy(() => import("../pages/User/Departments"));
const CommunityFeed = lazy(() => import("../pages/User/CommunityFeed"));


export default function AppRoutes() {
  const { isAuthenticated, role } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          isAuthenticated
            ? (role === 'admin'
              ? <Navigate to="/admin/dashboard" replace />
              : role === 'staff'
              ? <Navigate to="/staff/dashboard" replace />
              : <Navigate to="/user/dashboard" replace />
            )
            : <Home />
        }
      />

      <Route
        path="/auth"
        element={
          isAuthenticated
            ? (role === 'admin'
              ? <Navigate to="/admin/dashboard" replace />
              : role === 'staff'
              ? <Navigate to="/staff/dashboard" replace />
              : <Navigate to="/user/dashboard" replace />
            )
            : <Auth />
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        {/* Protected User Routes */}
        <Route element={<RoleRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<CommunityFeed />} />
            <Route path="dashboard" element={<CommunityFeed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="raise-problem" element={<RaiseProblem />} />
            <Route path="my-reports" element={<MyReports />} />
            <Route path="local-issues" element={<LocalIssues />} />
            <Route path="report/:id" element={<ReportDetail />} />
            <Route path="departments" element={<Departments />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="issue-management" element={<IssueManagement />} />
            <Route path="issue/:issueId" element={<IssueDetail />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

        {/* Protected Staff Routes */}
        <Route element={<RoleRoute allowedRoles={["staff"]} />}>
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffDashboard />} />
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="issues" element={<StaffIssueManagement />} />
            <Route path="issues/:issueId" element={<StaffIssueDetail />} />
            <Route path="profile" element={<StaffProfile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
