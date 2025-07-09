import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Home,
  Users,
  BookOpen,
  Calculator,
  Calendar,
  ChartBar,
  FileText,
  MessageSquare,
  Award,
  Clock,
  School,
  Briefcase,
  UserPlus,
  Mail,
  Upload,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../types/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: UserRole[];
  badge?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get role-specific dashboard route
  const getDashboardRoute = (role: UserRole) => {
    const roleRoutes = {
      admin: "/dashboard/admin",
      teacher: "/dashboard/teacher",
      secretary: "/dashboard/secretary",
      proprietor: "/dashboard/proprietor",
      parent: "/dashboard/parent",
      student: "/dashboard/student",
    };
    return roleRoutes[role] || "/dashboard";
  };

  // Role-based menu items
  const menuItems: MenuItem[] = [
    // Common items
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: user ? getDashboardRoute(user.role) : "/dashboard",
      roles: [
        "admin",
        "teacher",
        "secretary",
        "proprietor",
        "parent",
        "student",
      ],
    },

    // Admin specific
    {
      id: "users",
      label: "User Management",
      icon: <Users className="w-5 h-5" />,
      href: "/dashboard/users",
      roles: ["admin"],
    },
    {
      id: "schools",
      label: "School Settings",
      icon: <School className="w-5 h-5" />,
      href: "/dashboard/schools",
      roles: ["admin", "proprietor"],
    },
    {
      id: "reports",
      label: "Analytics & Reports",
      icon: <ChartBar className="w-5 h-5" />,
      href: "/dashboard/reports",
      roles: ["admin", "proprietor", "secretary"],
    },

    // Student Management
    {
      id: "students",
      label: "Students",
      icon: <Users className="w-5 h-5" />,
      href: "/dashboard/students",
      roles: ["admin", "teacher", "secretary"],
    },
    {
      id: "classes",
      label: "Classes",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/dashboard/classes",
      roles: ["admin", "teacher", "secretary"],
    },

    // Academic
    {
      id: "attendance",
      label: "Attendance",
      icon: <Calendar className="w-5 h-5" />,
      href: "/dashboard/attendance",
      roles: ["admin", "teacher", "secretary"],
    },
    {
      id: "grades",
      label: "Grades & Results",
      icon: <Award className="w-5 h-5" />,
      href: "/dashboard/grades",
      roles: ["admin", "teacher", "parent", "student"],
    },
    {
      id: "assignments",
      label: "Assignments",
      icon: <FileText className="w-5 h-5" />,
      href: "/dashboard/assignments",
      roles: ["teacher", "student", "parent"],
    },

    // Financial
    {
      id: "fees",
      label: "Fee Management",
      icon: <Calculator className="w-5 h-5" />,
      href: "/dashboard/fees",
      roles: ["admin", "secretary", "proprietor", "parent"],
    },
    {
      id: "payments",
      label: "Payments",
      icon: <Calculator className="w-5 h-5" />,
      href: "/dashboard/payments",
      roles: ["admin", "secretary", "proprietor", "parent"],
    },

    // Communication
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "/dashboard/messages",
      roles: ["admin", "teacher", "secretary", "parent"],
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: <Bell className="w-5 h-5" />,
      href: "/dashboard/announcements",
      roles: ["admin", "teacher", "secretary", "parent", "student"],
    },

    // Staff specific
    {
      id: "payroll",
      label: "Payroll",
      icon: <Briefcase className="w-5 h-5" />,
      href: "/dashboard/payroll",
      roles: ["admin", "proprietor"],
    },

    // Proprietor - User Management
    {
      id: "invite-users",
      label: "Invite Users",
      icon: <UserPlus className="w-5 h-5" />,
      href: "/dashboard/invite-users",
      roles: ["proprietor"],
    },
    {
      id: "manage-invitations",
      label: "Manage Invitations",
      icon: <Mail className="w-5 h-5" />,
      href: "/dashboard/manage-invitations",
      roles: ["proprietor"],
    },
    {
      id: "bulk-import",
      label: "Bulk Import",
      icon: <Upload className="w-5 h-5" />,
      href: "/dashboard/bulk-import",
      roles: ["proprietor"],
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: <Clock className="w-5 h-5" />,
      href: "/dashboard/schedule",
      roles: ["teacher", "student"],
    },

    // Parent specific
    {
      id: "children",
      label: "My Children",
      icon: <Users className="w-5 h-5" />,
      href: "/dashboard/children",
      roles: ["parent"],
    },

    // Student specific
    {
      id: "profile",
      label: "My Profile",
      icon: <User className="w-5 h-5" />,
      href: "/dashboard/profile",
      roles: ["student", "parent"],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (!user) {
    return null; // This should be handled by protected routes
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar - Overlay on mobile devices */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : "-100%",
        }}
        className="fixed lg:hidden w-64 h-full bg-white shadow-xl z-50 overflow-hidden"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3"
              onClick={closeSidebar}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-bold text-gray-900">
                  School<span className="text-primary-500">Hub</span>
                </span>
                <p className="text-xs text-gray-500 capitalize">
                  {user.role} Portal
                </p>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User Info Card */}
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm lg:text-lg">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-primary-600 font-medium capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      onClick={closeSidebar}
                      className={`flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-primary-50 text-primary-600 border border-primary-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`transition-colors ${
                          isActive
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm lg:text-base font-medium">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 lg:p-6 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/dashboard/settings"
                onClick={closeSidebar}
                className="flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-sm lg:text-base font-medium">
                  Settings
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm lg:text-base font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Desktop Sidebar - Fixed position on large screens */}
      <aside className="hidden lg:flex fixed lg:left-0 lg:top-0 lg:w-64 xl:w-72 h-full bg-white shadow-xl border-r border-gray-200 z-40">
        <div className="flex flex-col h-full w-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-bold text-gray-900">
                  School<span className="text-primary-500">Hub</span>
                </span>
                <p className="text-xs text-gray-500 capitalize">
                  {user.role} Portal
                </p>
              </div>
            </Link>
          </div>

          {/* User Info Card */}
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm lg:text-lg">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-primary-600 font-medium capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-primary-50 text-primary-600 border border-primary-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`transition-colors ${
                          isActive
                            ? "text-primary-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm lg:text-base font-medium">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 lg:p-6 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/dashboard/settings"
                className="flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-sm lg:text-base font-medium">
                  Settings
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm lg:text-base font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 xl:ml-72">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
            {/* Left: Mobile Menu + Search */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>

              {/* Search Bar - Hidden on small screens */}
              <div className="hidden sm:flex items-center relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-300 focus:bg-white transition-all text-sm w-64 lg:w-80"
                />
              </div>
            </div>

            {/* Right: Notifications + Profile */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Mobile Search Button */}
              <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 lg:space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
