import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Upload,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Download,
  Eye,
  Trash2,
  Send,
  Users,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  User,
  FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../types/auth";

interface InvitationData {
  id: string;
  email: string;
  role: UserRole;
  status: "pending" | "accepted" | "expired" | "cancelled";
  sentAt: Date;
  expiresAt: Date;
  acceptedAt?: Date;
  additionalInfo?: {
    firstName?: string;
    lastName?: string;
    department?: string;
    classGrade?: string;
    studentId?: string;
    employeeId?: string;
  };
}

type InvitationTab = "invite" | "manage" | "bulk" | "templates";

const InvitationDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<InvitationTab>("invite");
  // const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Mock invitation data
  const [invitations, _setInvitations] = useState<InvitationData[]>([
    {
      id: "inv_001",
      email: "john.smith@email.com",
      role: "teacher",
      status: "accepted",
      sentAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      acceptedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      additionalInfo: {
        firstName: "John",
        lastName: "Smith",
        department: "Mathematics",
      },
    },
    {
      id: "inv_002",
      email: "sarah.johnson@email.com",
      role: "teacher",
      status: "pending",
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      additionalInfo: {
        firstName: "Sarah",
        lastName: "Johnson",
        department: "Science",
      },
    },
    {
      id: "inv_003",
      email: "mike.wilson@email.com",
      role: "parent",
      status: "pending",
      sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      additionalInfo: { firstName: "Mike", lastName: "Wilson" },
    },
    {
      id: "inv_004",
      email: "admin@email.com",
      role: "secretary",
      status: "expired",
      sentAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      additionalInfo: { firstName: "Lisa", lastName: "Brown" },
    },
  ]);

  const tabs = [
    { id: "invite" as const, label: "Invite Users", icon: UserPlus },
    { id: "manage" as const, label: "Manage Invitations", icon: Users },
    { id: "bulk" as const, label: "Bulk Import", icon: Upload },
    { id: "templates" as const, label: "Email Templates", icon: Mail },
  ];

  const roleOptions = [
    { value: "teacher", label: "Teacher", icon: BookOpen, color: "blue" },
    { value: "student", label: "Student", icon: GraduationCap, color: "green" },
    { value: "parent", label: "Parent", icon: User, color: "purple" },
    { value: "secretary", label: "Secretary", icon: FileText, color: "orange" },
    { value: "admin", label: "Administrator", icon: ShieldCheck, color: "red" },
  ];

  const getStatusIcon = (status: InvitationData["status"]) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "expired":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: InvitationData["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: UserRole) => {
    const roleOption = roleOptions.find((option) => option.value === role);
    if (!roleOption) return <User className="w-4 h-4" />;
    const IconComponent = roleOption.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  const filteredInvitations = invitations.filter((invitation) => {
    const matchesSearch =
      invitation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.additionalInfo?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      invitation.additionalInfo?.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || invitation.status === statusFilter;
    const matchesRole = roleFilter === "all" || invitation.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: invitations.length,
    pending: invitations.filter((inv) => inv.status === "pending").length,
    accepted: invitations.filter((inv) => inv.status === "accepted").length,
    expired: invitations.filter((inv) => inv.status === "expired").length,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "invite":
        return <InviteUsersTab roleOptions={roleOptions} user={user} />;
      case "manage":
        return (
          <ManageInvitationsTab
            invitations={filteredInvitations}
            stats={stats}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
            getRoleIcon={getRoleIcon}
            roleOptions={roleOptions}
          />
        );
      case "bulk":
        return <BulkImportTab />;
      case "templates":
        return <EmailTemplatesTab user={user} />;
      default:
        return <InviteUsersTab roleOptions={roleOptions} user={user} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            User Management
          </h2>
          <p className="text-gray-600">
            Invite and manage access for teachers, students, parents, and staff
            members.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-600">{stats.pending} Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-600">{stats.accepted} Accepted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-600">{stats.expired} Expired</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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

// Invite Users Tab Component
interface InviteUsersTabProps {
  roleOptions: any[];
  user: any;
}

const InviteUsersTab: React.FC<InviteUsersTabProps> = ({
  roleOptions,
  user,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    role: "teacher" as UserRole,
    firstName: "",
    lastName: "",
    department: "",
    classGrade: "",
    studentId: "",
    employeeId: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Sending invitation:", formData);

      // Reset form
      setFormData({
        email: "",
        role: "teacher",
        firstName: "",
        lastName: "",
        department: "",
        classGrade: "",
        studentId: "",
        employeeId: "",
        message: "",
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to send invitation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleSpecificFields = () => {
    switch (formData.role) {
      case "teacher":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="Mathematics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID (Optional)
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeId: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="EMP001"
              />
            </div>
          </div>
        );
      case "student":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class/Grade
              </label>
              <select
                value={formData.classGrade}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    classGrade: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Select Class</option>
                <option value="grade-9">Grade 9</option>
                <option value="grade-10">Grade 10</option>
                <option value="grade-11">Grade 11</option>
                <option value="grade-12">Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID (Optional)
              </label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    studentId: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="STU001"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Invitation Form */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Send Invitation
        </h3>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Invitation sent successfully!
            </span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roleOptions.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: role.value }))
                  }
                  className={`p-3 border rounded-lg transition-all ${
                    formData.role === role.value
                      ? `border-${role.color}-500 bg-${role.color}-50 text-${role.color}-700`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <role.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{role.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              placeholder="john.doe@email.com"
            />
          </div>

          {/* Role-specific Fields */}
          {getRoleSpecificFields()}

          {/* Personal Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-none"
              placeholder="Welcome to our school! We're excited to have you join our team."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending Invitation...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Invitation
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Email Preview */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Email Preview
        </h3>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Email Header */}
          <div
            className="p-4 text-white"
            style={{
              background: `linear-gradient(135deg, #3B82F6, #10B981)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">
                {user?.schoolName || "Your School"}
              </span>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-6 space-y-4">
            <h4 className="text-xl font-bold text-gray-900">
              You're invited to join {user?.schoolName || "Your School"}!
            </h4>

            <p className="text-gray-600">
              Hello {formData.firstName || "[First Name]"},
            </p>

            <p className="text-gray-600">
              {user?.firstName} {user?.lastName} has invited you to join{" "}
              <strong>{user?.schoolName || "Your School"}</strong> as a{" "}
              <strong>{formData.role}</strong>.
            </p>

            {formData.message && (
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500">
                <p className="text-gray-700 italic">"{formData.message}"</p>
              </div>
            )}

            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-sm text-primary-700 font-medium mb-2">
                Next Steps:
              </p>
              <ol className="text-sm text-primary-600 space-y-1">
                <li>1. Click the "Accept Invitation" button below</li>
                <li>2. Create your account with a secure password</li>
                <li>3. Complete your profile setup</li>
                <li>4. Start using the school management system!</li>
              </ol>
            </div>

            <motion.button
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Accept Invitation
            </motion.button>

            <p className="text-xs text-gray-500 text-center">
              This invitation expires in 7 days. If you have any questions,
              please contact {user?.email || "the school administrator"}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Manage Invitations Tab Component
interface ManageInvitationsTabProps {
  invitations: InvitationData[];
  stats: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  getStatusIcon: (status: InvitationData["status"]) => React.ReactNode;
  getStatusColor: (status: InvitationData["status"]) => string;
  getRoleIcon: (role: UserRole) => React.ReactNode;
  roleOptions: any[];
}

const ManageInvitationsTab: React.FC<ManageInvitationsTabProps> = ({
  invitations,
  stats,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  getStatusIcon,
  getStatusColor,
  getRoleIcon,
  roleOptions,
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Invitations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Accepted</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.accepted}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Roles</option>
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Invitations Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  User
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Sent
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Expires
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invitations.map((invitation) => (
                <tr key={invitation.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {invitation.additionalInfo?.firstName}{" "}
                        {invitation.additionalInfo?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {invitation.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(invitation.role)}
                      <span className="capitalize font-medium text-gray-900">
                        {invitation.role}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invitation.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          invitation.status
                        )}`}
                      >
                        {invitation.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {invitation.sentAt.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {invitation.expiresAt.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {invitation.status === "pending" && (
                        <>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Bulk Import Tab Component
const BulkImportTab: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upload CSV File
          </h3>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-primary-400 bg-primary-50"
                : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <div>
                  <p className="font-medium text-gray-900">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                >
                  Choose different file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-primary-500">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    CSV files only, max 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="inline-block bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                >
                  Select File
                </label>
              </div>
            )}
          </div>

          {uploadedFile && (
            <div className="mt-6">
              <button className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Process Invitations
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            CSV Format Instructions
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Required Columns:
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  • <code className="bg-gray-100 px-1 rounded">email</code> -
                  Email address
                </li>
                <li>
                  • <code className="bg-gray-100 px-1 rounded">role</code> -
                  teacher, student, parent, secretary, admin
                </li>
                <li>
                  • <code className="bg-gray-100 px-1 rounded">first_name</code>{" "}
                  - First name
                </li>
                <li>
                  • <code className="bg-gray-100 px-1 rounded">last_name</code>{" "}
                  - Last name
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Optional Columns:
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  • <code className="bg-gray-100 px-1 rounded">department</code>{" "}
                  - For teachers
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-100 px-1 rounded">class_grade</code>{" "}
                  - For students
                </li>
                <li>
                  • <code className="bg-gray-100 px-1 rounded">student_id</code>{" "}
                  - For students
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-100 px-1 rounded">employee_id</code>{" "}
                  - For staff
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="flex items-center gap-2 text-primary-500 hover:text-primary-600 text-sm font-medium">
                <Download className="w-4 h-4" />
                Download Sample CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Templates Tab Component
interface EmailTemplatesTabProps {
  user: any;
}

const EmailTemplatesTab: React.FC<EmailTemplatesTabProps> = ({}) => {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
      <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Email Templates
      </h3>
      <p className="text-gray-600 mb-6">
        Customize invitation email templates with your school's branding and
        messaging.
      </p>
      <div className="text-sm text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-4">
        🎨 Coming soon! Create custom email templates with your school's
        branding and personalized messages.
      </div>
    </div>
  );
};

export default InvitationDashboard;
