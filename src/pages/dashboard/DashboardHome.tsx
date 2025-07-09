import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Bell,
  CheckCircle,
  DollarSign,
  Clock,
  Award,
  MessageSquare,
  FileText,
  BarChart3,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../types/auth";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const DashboardHome: React.FC = () => {
  // Automatically scroll to top when component mounts
  useScrollToTop();
  const { user } = useAuth();

  if (!user) return null;

  // Role-specific dashboard content
  const getDashboardContent = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      case "secretary":
        return <SecretaryDashboard />;
      case "proprietor":
        return <ProprietorDashboard />;
      case "parent":
        return <ParentDashboard />;
      case "student":
        return <StudentDashboard />;
      default:
        return <DefaultDashboard />;
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
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-white/90">{getRoleWelcomeMessage(user.role)}</p>
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
            <p className="text-white font-semibold capitalize">
              {user.schoolName}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Role-specific Dashboard Content */}
      {getDashboardContent()}
    </div>
  );
};

// Welcome messages by role
const getRoleWelcomeMessage = (role: UserRole) => {
  const messages = {
    admin: "Manage your school efficiently and track overall performance.",
    teacher: "Ready to inspire and educate your students today.",
    secretary:
      "Handle admissions, billing, and administrative tasks seamlessly.",
    proprietor: "Monitor your school's growth and financial performance.",
    parent: "Stay connected with your child's educational journey.",
    student: "Continue learning and achieve your academic goals.",
  };
  return messages[role as keyof typeof messages] || "Welcome to SchoolHub!";
};

// Admin Dashboard
const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm lg:text-base text-gray-600">
                Total Students
              </p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">
                1,247
              </p>
              <p className="text-xs lg:text-sm text-green-600 font-medium">
                +5.2% from last month
              </p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm lg:text-base text-gray-600">Teachers</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">89</p>
              <p className="text-xs lg:text-sm text-green-600 font-medium">
                +2 new this week
              </p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm lg:text-base text-gray-600">Attendance</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">
                96.5%
              </p>
              <p className="text-xs lg:text-sm text-yellow-600 font-medium">
                -1.2% from yesterday
              </p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm lg:text-base text-gray-600">Revenue</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">
                ₦2.4M
              </p>
              <p className="text-xs lg:text-sm text-green-600 font-medium">
                +8.1% this month
              </p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions role="admin" />
        <RecentActivity role="admin" />
      </div>
    </div>
  );
};

// Teacher Dashboard
const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="My Classes"
          value="6"
          change="+1 new class"
          icon={<BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Students"
          value="187"
          change="Across all classes"
          icon={<Users className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Assignments"
          value="12"
          change="Pending review"
          icon={<FileText className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />}
          color="orange"
        />
        <StatCard
          title="Avg. Performance"
          value="87%"
          change="+3% improvement"
          icon={<Award className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions role="teacher" />
        <RecentActivity role="teacher" />
      </div>
    </div>
  );
};

// Secretary Dashboard
const SecretaryDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="New Admissions"
          value="23"
          change="This month"
          icon={<Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Pending Fees"
          value="₦340K"
          change="45 students"
          icon={<DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />}
          color="red"
        />
        <StatCard
          title="Documents"
          value="67"
          change="Awaiting processing"
          icon={<FileText className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />}
          color="yellow"
        />
        <StatCard
          title="Inquiries"
          value="15"
          change="Need response"
          icon={
            <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
          }
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions role="secretary" />
        <RecentActivity role="secretary" />
      </div>
    </div>
  );
};

// Proprietor Dashboard
const ProprietorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Monthly Revenue"
          value="₦2.4M"
          change="+8.1% growth"
          icon={<DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Total Students"
          value="1,247"
          change="+64 this term"
          icon={<Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Staff Count"
          value="89"
          change="Fully staffed"
          icon={<BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />}
          color="purple"
        />
        <StatCard
          title="School Rating"
          value="4.8/5"
          change="Excellent"
          icon={<Award className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions role="proprietor" />
        <RecentActivity role="proprietor" />
      </div>
    </div>
  );
};

// Parent Dashboard
const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Child's Attendance"
          value="98%"
          change="Excellent"
          icon={<Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Average Grade"
          value="A-"
          change="Good performance"
          icon={<Award className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Assignments"
          value="3"
          change="Due this week"
          icon={<FileText className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />}
          color="orange"
        />
        <StatCard
          title="Fee Balance"
          value="₦0"
          change="Fully paid"
          icon={
            <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
          }
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions role="parent" />
        <RecentActivity role="parent" />
      </div>
    </div>
  );
};

// Student Dashboard
const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="My Attendance"
          value="98%"
          change="Great job!"
          icon={<Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Assignments"
          value="3"
          change="Due this week"
          icon={<FileText className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />}
          color="orange"
        />
        <StatCard
          title="Current GPA"
          value="3.7"
          change="Keep it up!"
          icon={<Award className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Next Class"
          value="Math"
          change="In 30 mins"
          icon={<Clock className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions role="student" />
        <RecentActivity role="student" />
      </div>
    </div>
  );
};

// Default Dashboard
const DefaultDashboard: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Dashboard Coming Soon
      </h2>
      <p className="text-gray-600">
        Your role-specific dashboard is being prepared.
      </p>
    </div>
  );
};

// Reusable Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm lg:text-base text-gray-600">{title}</p>
          <p className="text-xl lg:text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs lg:text-sm text-gray-500 font-medium">
            {change}
          </p>
        </div>
        <div
          className={`w-10 h-10 lg:w-12 lg:h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// Quick Actions Component
interface QuickActionsProps {
  role: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ role }) => {
  const getQuickActions = () => {
    const actions = {
      admin: [
        {
          title: "Add New Student",
          href: "/dashboard/students/add",
          icon: <PlusCircle className="w-5 h-5" />,
        },
        {
          title: "View Reports",
          href: "/dashboard/reports",
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          title: "Manage Users",
          href: "/dashboard/users",
          icon: <Users className="w-5 h-5" />,
        },
        {
          title: "School Settings",
          href: "/dashboard/settings",
          icon: <BookOpen className="w-5 h-5" />,
        },
      ],
      teacher: [
        {
          title: "Mark Attendance",
          href: "/dashboard/attendance",
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          title: "Create Assignment",
          href: "/dashboard/assignments/new",
          icon: <PlusCircle className="w-5 h-5" />,
        },
        {
          title: "Enter Grades",
          href: "/dashboard/grades",
          icon: <Award className="w-5 h-5" />,
        },
        {
          title: "View My Classes",
          href: "/dashboard/classes",
          icon: <BookOpen className="w-5 h-5" />,
        },
      ],
      secretary: [
        {
          title: "New Admission",
          href: "/dashboard/admissions/new",
          icon: <PlusCircle className="w-5 h-5" />,
        },
        {
          title: "Process Payments",
          href: "/dashboard/payments",
          icon: <DollarSign className="w-5 h-5" />,
        },
        {
          title: "Send Notification",
          href: "/dashboard/notifications/new",
          icon: <Bell className="w-5 h-5" />,
        },
        {
          title: "Manage Documents",
          href: "/dashboard/documents",
          icon: <FileText className="w-5 h-5" />,
        },
      ],
      proprietor: [
        {
          title: "Financial Reports",
          href: "/dashboard/finance",
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          title: "School Performance",
          href: "/dashboard/performance",
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: "Staff Management",
          href: "/dashboard/staff",
          icon: <Users className="w-5 h-5" />,
        },
        {
          title: "Strategic Planning",
          href: "/dashboard/planning",
          icon: <BookOpen className="w-5 h-5" />,
        },
      ],
      parent: [
        {
          title: "View Child's Progress",
          href: "/dashboard/progress",
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: "Pay School Fees",
          href: "/dashboard/payments",
          icon: <DollarSign className="w-5 h-5" />,
        },
        {
          title: "Message Teacher",
          href: "/dashboard/messages",
          icon: <MessageSquare className="w-5 h-5" />,
        },
        {
          title: "Download Reports",
          href: "/dashboard/reports",
          icon: <FileText className="w-5 h-5" />,
        },
      ],
      student: [
        {
          title: "View Assignments",
          href: "/dashboard/assignments",
          icon: <FileText className="w-5 h-5" />,
        },
        {
          title: "Check Results",
          href: "/dashboard/results",
          icon: <Award className="w-5 h-5" />,
        },
        {
          title: "Class Schedule",
          href: "/dashboard/schedule",
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          title: "Submit Assignment",
          href: "/dashboard/assignments/submit",
          icon: <PlusCircle className="w-5 h-5" />,
        },
      ],
    };
    return actions[role as keyof typeof actions] || [];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {getQuickActions().map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <div className="text-gray-400 group-hover:text-primary-600 transition-colors">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors">
              {action.title}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors ml-auto" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

// Recent Activity Component
interface RecentActivityProps {
  role: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({}) => {
  // This would typically come from an API
  const activities = [
    {
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      text: "Assignment submitted by John Doe",
      time: "2 minutes ago",
    },
    {
      icon: <Bell className="w-4 h-4 text-blue-600" />,
      text: "New announcement posted",
      time: "15 minutes ago",
    },
    {
      icon: <Users className="w-4 h-4 text-purple-600" />,
      text: "Student attendance marked",
      time: "1 hour ago",
    },
    {
      icon: <FileText className="w-4 h-4 text-orange-600" />,
      text: "Grade report generated",
      time: "2 hours ago",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="mt-1">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">{activity.text}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard/activity"
        className="inline-flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium mt-4"
      >
        <span>View all activity</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
};

export default DashboardHome;
