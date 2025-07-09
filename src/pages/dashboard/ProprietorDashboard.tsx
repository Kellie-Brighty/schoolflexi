import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  BookOpen,
  Award,
  Settings,
  Palette,
  UserPlus,
  BarChart3,
  TrendingUp,
  School,
  Mail,
} from "lucide-react";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { useAuth } from "../../contexts/AuthContext";
import SchoolBranding from "../../components/dashboard/SchoolBranding";

type DashboardTab = "overview" | "branding" | "settings";

const ProprietorDashboard: React.FC = () => {
  // Automatically scroll to top when component mounts
  useScrollToTop();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "branding" as const, label: "School Branding", icon: Palette },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  const stats = [
    {
      title: "Monthly Revenue",
      value: "₦2.4M",
      change: "+8.1% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Total Students",
      value: "1,247",
      change: "+64 this term",
      changeType: "positive" as const,
      icon: Users,
      color: "blue",
    },
    {
      title: "Staff Members",
      value: "89",
      change: "Fully staffed",
      changeType: "neutral" as const,
      icon: BookOpen,
      color: "purple",
    },
    {
      title: "School Rating",
      value: "4.8/5",
      change: "98% parent satisfaction",
      changeType: "positive" as const,
      icon: Award,
      color: "yellow",
    },
  ];

  const quickActions = [
    {
      title: "Invite New Staff",
      description: "Add teachers, secretaries, or other staff members",
      icon: UserPlus,
      action: () => console.log("Invite staff"),
      color: "blue",
    },
    {
      title: "Customize Branding",
      description: "Update your school's colors and logo",
      icon: Palette,
      action: () => setActiveTab("branding"),
      color: "purple",
    },
    {
      title: "View Financial Reports",
      description: "Check revenue, expenses, and financial health",
      icon: TrendingUp,
      action: () => console.log("View reports"),
      color: "green",
    },
    {
      title: "Send Announcements",
      description: "Communicate with all staff and students",
      icon: Mail,
      action: () => console.log("Send announcements"),
      color: "orange",
    },
  ];

  const recentActivities = [
    {
      type: "enrollment",
      message: "5 new students enrolled this week",
      time: "2 hours ago",
      icon: Users,
      color: "blue",
    },
    {
      type: "payment",
      message: "Monthly fees collected: ₦180,000",
      time: "1 day ago",
      icon: DollarSign,
      color: "green",
    },
    {
      type: "staff",
      message: "New math teacher Sarah Johnson joined",
      time: "3 days ago",
      icon: BookOpen,
      color: "purple",
    },
    {
      type: "rating",
      message: "School rating improved to 4.8/5",
      time: "1 week ago",
      icon: Award,
      color: "yellow",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            stats={stats}
            quickActions={quickActions}
            recentActivities={recentActivities}
          />
        );
      case "branding":
        return <SchoolBranding />;
      case "settings":
        return <SettingsTab />;
      default:
        return (
          <OverviewTab
            stats={stats}
            quickActions={quickActions}
            recentActivities={recentActivities}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 lg:p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-white/90">
              Monitor your school's growth and manage operations efficiently.
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-white font-semibold flex items-center gap-2">
              <School className="w-4 h-4" />
              {user?.schoolName}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-1"
      >
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

// Overview Tab Component
interface OverviewTabProps {
  stats: any[];
  quickActions: any[];
  recentActivities: any[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  stats,
  quickActions,
  recentActivities,
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm lg:text-base text-gray-600">
                  {stat.title}
                </p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p
                  className={`text-xs lg:text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
              >
                <stat.icon
                  className={`w-5 h-5 lg:w-6 lg:h-6 text-${stat.color}-600`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/30 transition-all text-left"
              >
                <div
                  className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 bg-${activity.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <activity.icon
                    className={`w-4 h-4 text-${activity.color}-600`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
      <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        School Settings
      </h3>
      <p className="text-gray-600 mb-6">
        Configure general school settings, academic calendar, and system
        preferences.
      </p>
      <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-4">
        ⚙️ Coming soon! Manage your school's operational settings and
        preferences here.
      </div>
    </div>
  );
};

export default ProprietorDashboard;
