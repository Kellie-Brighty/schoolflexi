import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Import components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SchoolRegisterPage from "./pages/auth/SchoolRegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AcceptInvitationPage from "./pages/auth/AcceptInvitationPage";
import SchoolLandingPage from "./pages/SchoolLandingPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Dashboard components
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import SecretaryDashboard from "./pages/dashboard/SecretaryDashboard";
import ProprietorDashboard from "./pages/dashboard/ProprietorDashboard";
import ParentDashboard from "./pages/dashboard/ParentDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import InviteUsersPage from "./pages/dashboard/InviteUsersPage";
import ManageInvitationsPage from "./pages/dashboard/ManageInvitationsPage";
import BulkImportPage from "./pages/dashboard/BulkImportPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/login/:schoolCode" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route
            path="/auth/register-school"
            element={<SchoolRegisterPage />}
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/auth/accept-invitation"
            element={<AcceptInvitationPage />}
          />

          {/* School Landing Page - First page after login */}
          <Route
            path="/school"
            element={
              <ProtectedRoute>
                <SchoolLandingPage />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Routes - All Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Role-specific Dashboard Routes */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <DashboardLayout>
                  <TeacherDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/secretary"
            element={
              <ProtectedRoute allowedRoles={["secretary"]}>
                <DashboardLayout>
                  <SecretaryDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/proprietor"
            element={
              <ProtectedRoute allowedRoles={["proprietor"]}>
                <DashboardLayout>
                  <ProprietorDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/parent"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <DashboardLayout>
                  <ParentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Proprietor - User Management Routes */}
          <Route
            path="/dashboard/invite-users"
            element={
              <ProtectedRoute allowedRoles={["proprietor"]}>
                <DashboardLayout>
                  <InviteUsersPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/manage-invitations"
            element={
              <ProtectedRoute allowedRoles={["proprietor"]}>
                <DashboardLayout>
                  <ManageInvitationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/bulk-import"
            element={
              <ProtectedRoute allowedRoles={["proprietor"]}>
                <DashboardLayout>
                  <BulkImportPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
