import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  BookOpen,
  GraduationCap,
  Shield,
  FileText,
  Settings,
  Edit3,
  Plus,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Award,
  ChevronRight,
  Megaphone,
  Heart,
  LogOut,
  School,
  Menu,
  X,
  Sparkles,
  Crown,
  Zap,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: "high" | "medium" | "low";
  category: "general" | "academic" | "event" | "emergency";
}

interface QuickLink {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  color: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "academic" | "sports" | "cultural" | "meeting";
}

const SchoolLandingPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Enhanced school branding with more sophisticated colors
  const schoolBranding = {
    primaryColor:
      user?.schoolCode === "GHS001"
        ? "#1d4ed8"
        : user?.schoolCode === "SMA001"
        ? "#dc2626"
        : user?.schoolCode === "OPS001"
        ? "#059669"
        : "#3B82F6",
    secondaryColor:
      user?.schoolCode === "GHS001"
        ? "#10b981"
        : user?.schoolCode === "SMA001"
        ? "#f59e0b"
        : user?.schoolCode === "OPS001"
        ? "#7c3aed"
        : "#10B981",
    accentColor:
      user?.schoolCode === "GHS001"
        ? "#8b5cf6"
        : user?.schoolCode === "SMA001"
        ? "#06b6d4"
        : user?.schoolCode === "OPS001"
        ? "#f59e0b"
        : "#8b5cf6",
  };

  // Role-specific dashboard navigation
  const getDashboardNavigation = () => {
    const roleRoutes = {
      admin: {
        path: "/dashboard/admin",
        title: "Admin Dashboard",
        icon: Shield,
        color: "red",
      },
      teacher: {
        path: "/dashboard/teacher",
        title: "Teacher Dashboard",
        icon: BookOpen,
        color: "blue",
      },
      secretary: {
        path: "/dashboard/secretary",
        title: "Secretary Dashboard",
        icon: FileText,
        color: "green",
      },
      proprietor: {
        path: "/dashboard/proprietor",
        title: "Proprietor Dashboard",
        icon: Crown,
        color: "purple",
      },
      parent: {
        path: "/dashboard/parent",
        title: "Parent Dashboard",
        icon: Heart,
        color: "pink",
      },
      student: {
        path: "/dashboard/student",
        title: "Student Dashboard",
        icon: GraduationCap,
        color: "blue",
      },
    };

    return roleRoutes[user?.role as keyof typeof roleRoutes];
  };

  // Mock data
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "🎓 Parent-Teacher Conference",
      content:
        "Join us for our quarterly parent-teacher conference. Individual time slots available for personalized discussions.",
      author: "Principal Johnson",
      date: "2024-03-10",
      priority: "high",
      category: "academic",
    },
    {
      id: "2",
      title: "🏆 Science Fair Champions",
      content:
        "Congratulations to all participants! Our students showcased incredible innovation and creativity.",
      author: "Ms. Rodriguez",
      date: "2024-03-08",
      priority: "medium",
      category: "academic",
    },
    {
      id: "3",
      title: "📚 Extended Library Hours",
      content:
        "Library now open until 6 PM weekdays to better support our learning community.",
      author: "Library Team",
      date: "2024-03-05",
      priority: "low",
      category: "general",
    },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: "1",
      title: "Spring Concert",
      date: "2024-03-20",
      time: "7:00 PM",
      location: "Main Auditorium",
      type: "cultural",
    },
    {
      id: "2",
      title: "Basketball Finals",
      date: "2024-03-18",
      time: "3:30 PM",
      location: "School Gymnasium",
      type: "sports",
    },
    {
      id: "3",
      title: "Faculty Meeting",
      date: "2024-03-15",
      time: "4:00 PM",
      location: "Conference Room",
      type: "meeting",
    },
  ];

  // Quick links for different user roles
  const getQuickLinks = (): QuickLink[] => {
    const roleSpecificLinks: Record<string, QuickLink[]> = {
      teacher: [
        {
          id: "gradebook",
          title: "Gradebook",
          description: "Manage assessments",
          icon: BookOpen,
          href: "/gradebook",
          color: "blue",
        },
        {
          id: "attendance",
          title: "Attendance",
          description: "Track student presence",
          icon: Users,
          href: "/attendance",
          color: "green",
        },
      ],
      student: [
        {
          id: "assignments",
          title: "Assignments",
          description: "View & submit work",
          icon: FileText,
          href: "/assignments",
          color: "purple",
        },
        {
          id: "grades",
          title: "My Grades",
          description: "Check progress",
          icon: Star,
          href: "/grades",
          color: "yellow",
        },
      ],
      parent: [
        {
          id: "progress",
          title: "Child's Progress",
          description: "Academic journey",
          icon: TrendingUp,
          href: "/progress",
          color: "pink",
        },
        {
          id: "fees",
          title: "Fee Payment",
          description: "Manage payments",
          icon: Award,
          href: "/fees",
          color: "green",
        },
      ],
      proprietor: [
        {
          id: "analytics",
          title: "Analytics",
          description: "School insights",
          icon: BarChart3,
          href: "/analytics",
          color: "indigo",
        },
        {
          id: "management",
          title: "Management",
          description: "School operations",
          icon: Settings,
          href: "/management",
          color: "gray",
        },
      ],
    };

    const commonLinks: QuickLink[] = [
      {
        id: "calendar",
        title: "Calendar",
        description: "Events & schedules",
        icon: Calendar,
        href: "/calendar",
        color: "blue",
      },
      {
        id: "directory",
        title: "Directory",
        description: "Contact information",
        icon: Users,
        href: "/directory",
        color: "green",
      },
    ];

    return [...commonLinks, ...(roleSpecificLinks[user?.role || ""] || [])];
  };

  const quickLinks = getQuickLinks();
  const dashboardNav = getDashboardNavigation();
  const canEdit = user?.role === "proprietor" || user?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: schoolBranding.primaryColor }}
        />
        <div
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ backgroundColor: schoolBranding.secondaryColor }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: schoolBranding.accentColor }}
        />
      </div>

      {/* Mobile-Responsive Glassmorphism Navigation */}
      <nav className="relative z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Mobile-Optimized School Branding */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.secondaryColor})`,
                }}
              >
                <School className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent truncate">
                  {user?.schoolName}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  {user?.schoolCode}
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {/* User Profile Card */}
              <motion.div
                className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 xl:px-5 py-3 rounded-2xl border border-white/30 shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.accentColor})`,
                  }}
                >
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-600 capitalize flex items-center gap-1">
                    {dashboardNav && <dashboardNav.icon className="w-3 h-3" />}
                    {user?.role}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              {dashboardNav && (
                <motion.button
                  onClick={() => navigate(dashboardNav.path)}
                  className="group relative overflow-hidden px-4 xl:px-6 py-3 text-white font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.secondaryColor})`,
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    <dashboardNav.icon className="w-4 h-4" />
                    <span className="hidden xl:inline">Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              )}

              <motion.button
                onClick={logout}
                className="group px-4 xl:px-5 py-3 text-gray-700 hover:text-gray-900 bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/30 hover:border-gray-300 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="hidden xl:inline">Logout</span>
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 text-gray-700 hover:text-gray-900 shadow-lg transition-all active:scale-95"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/20 py-4 space-y-3"
            >
              <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.accentColor})`,
                  }}
                >
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600 capitalize flex items-center gap-1">
                    {dashboardNav && <dashboardNav.icon className="w-3 h-3" />}
                    {user?.role}
                  </p>
                </div>
              </div>

              {dashboardNav && (
                <button
                  onClick={() => {
                    navigate(dashboardNav.path);
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 text-white font-semibold rounded-2xl shadow-lg active:scale-95 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.secondaryColor})`,
                  }}
                >
                  <dashboardNav.icon className="w-5 h-5" />
                  Go to Dashboard
                </button>
              )}

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 p-4 text-gray-700 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl font-medium active:scale-95 transition-transform"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Mobile-Optimized Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12"
          style={{
            background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.secondaryColor}, ${schoolBranding.accentColor})`,
          }}
        >
          {/* Mobile-Optimized Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="grid grid-cols-8 sm:grid-cols-12 gap-2 sm:gap-4 h-full">
                {[...Array(32)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/20 rounded-md sm:rounded-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 p-6 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                    <span className="text-white/80 font-medium text-sm sm:text-base">
                      Welcome back,
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {user?.firstName}
                    <br />
                    <span className="text-white/80 text-2xl sm:text-3xl lg:text-5xl">
                      to {user?.schoolName?.split(" ")[0]}
                    </span>
                  </h1>
                  <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                    Ready to make today amazing? Your learning journey continues
                    here.
                  </p>
                </motion.div>

                {dashboardNav && (
                  <motion.button
                    onClick={() => navigate(dashboardNav.path)}
                    className="group inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 border border-white/20 active:scale-95"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <dashboardNav.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>
                      Enter {dashboardNav.title.replace(" Dashboard", "")}
                    </span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center lg:text-right text-white/90"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <p className="text-xs sm:text-sm font-medium mb-2">
                    Today is
                  </p>
                  <p className="text-lg sm:text-2xl font-bold mb-1">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-2xl sm:text-4xl font-bold">
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mobile-Responsive Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12"
        >
          {[
            {
              icon: Users,
              label: "Students",
              value: "1,247",
              color: "blue",
              trend: "+12%",
            },
            {
              icon: BookOpen,
              label: "Faculty",
              value: "89",
              color: "green",
              trend: "+3%",
            },
            {
              icon: Award,
              label: "Attendance",
              value: "94%",
              color: "yellow",
              trend: "+5%",
            },
            {
              icon: Zap,
              label: "Programs",
              value: "15",
              color: "purple",
              trend: "+2%",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div
                  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg bg-${stat.color}-500 text-white`}
                >
                  <stat.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <span className="text-green-600 font-semibold text-xs sm:text-sm bg-green-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <p className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                {stat.label}
              </p>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile-Optimized Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg text-white"
                  style={{
                    background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.accentColor})`,
                  }}
                >
                  <Megaphone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Latest Updates
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Stay informed with school news
                  </p>
                </div>
              </div>
              {canEdit && (
                <motion.button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-all font-medium text-sm sm:text-base active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditMode ? "Done" : "Edit"}
                </motion.button>
              )}
            </div>

            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  className="group relative overflow-hidden bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border border-white/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 active:scale-[0.99]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                    <h4 className="font-semibold text-gray-900 text-base sm:text-lg group-hover:text-blue-700 transition-colors line-clamp-2">
                      {announcement.title}
                    </h4>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                        announcement.priority === "high"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : announcement.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base line-clamp-3">
                    {announcement.content}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 gap-2">
                    <span className="font-medium">
                      By {announcement.author}
                    </span>
                    <span>
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl sm:rounded-2xl" />
                </motion.div>
              ))}

              {canEdit && isEditMode && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50/50 transition-all flex items-center justify-center gap-3 font-medium active:scale-95"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  Add New Announcement
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Mobile-Optimized Events & Quick Links */}
          <div className="space-y-6 lg:space-y-8">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/30 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg text-white"
                  style={{
                    background: `linear-gradient(135deg, ${schoolBranding.secondaryColor}, ${schoolBranding.accentColor})`,
                  }}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Upcoming Events
                  </h3>
                  <p className="text-sm text-gray-600">Don't miss out</p>
                </div>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="group bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all active:scale-[0.99]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-2">
                        {event.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${
                          event.type === "academic"
                            ? "bg-blue-100 text-blue-700"
                            : event.type === "sports"
                            ? "bg-green-100 text-green-700"
                            : event.type === "cultural"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {event.type}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="w-full mt-4 text-sm font-medium text-center py-3 rounded-lg sm:rounded-xl transition-all active:scale-95"
                style={{ color: schoolBranding.primaryColor }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: `${schoolBranding.primaryColor}10`,
                }}
              >
                View Full Calendar →
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/30 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg text-white"
                  style={{
                    background: `linear-gradient(135deg, ${schoolBranding.accentColor}, ${schoolBranding.primaryColor})`,
                  }}
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Quick Actions
                  </h3>
                  <p className="text-sm text-gray-600">Jump right in</p>
                </div>
              </div>

              <div className="space-y-3">
                {quickLinks.slice(0, 4).map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => navigate(link.href)}
                    className="group w-full flex items-center gap-3 p-3 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl hover:shadow-md transition-all text-left active:scale-[0.99]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${link.color}-500 text-white shadow-sm group-hover:scale-110 transition-transform flex-shrink-0`}
                    >
                      <link.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {link.title}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {link.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile-Responsive Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 sm:mt-16 bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Phone,
                title: "Contact",
                content: "+1 (555) 123-4567",
                color: "blue",
              },
              {
                icon: Mail,
                title: "Email",
                content: `info@${user?.schoolCode?.toLowerCase()}.edu`,
                color: "green",
              },
              {
                icon: MapPin,
                title: "Address",
                content: "123 Education Street, Learning City",
                color: "purple",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                className="group text-center hover:scale-105 transition-transform cursor-pointer active:scale-95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 bg-${contact.color}-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg text-white group-hover:shadow-xl transition-shadow`}
                >
                  <contact.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  {contact.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                  {contact.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SchoolLandingPage;
