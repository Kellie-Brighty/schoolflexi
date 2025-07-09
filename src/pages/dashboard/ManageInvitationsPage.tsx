import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  User,
  BookOpen,
  GraduationCap,
  FileText,
  ShieldCheck,
} from "lucide-react";
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

const ManageInvitationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Mock invitation data
  const [invitations] = useState<InvitationData[]>([
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
    {
      id: "inv_005",
      email: "student@email.com",
      role: "student",
      status: "pending",
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      additionalInfo: {
        firstName: "Emma",
        lastName: "Davis",
        classGrade: "grade-10",
      },
    },
    {
      id: "inv_006",
      email: "admin2@email.com",
      role: "admin",
      status: "cancelled",
      sentAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      additionalInfo: { firstName: "Robert", lastName: "Miller" },
    },
  ]);

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
    cancelled: invitations.filter((inv) => inv.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Invitations
            </h1>
            <p className="text-gray-600">
              Track and manage all sent invitations to your school.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">
                Pending
              </span>
            </div>
            <p className="text-2xl font-bold text-yellow-700">
              {stats.pending}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Accepted
              </span>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {stats.accepted}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-600">Expired</span>
            </div>
            <p className="text-2xl font-bold text-red-700">{stats.expired}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                Cancelled
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-700">
              {stats.cancelled}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl border border-gray-200"
      >
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
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
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
          </div>

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
      </motion.div>

      {/* Invitations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
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
              {filteredInvitations.map((invitation) => (
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
                      <button
                        className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {invitation.status === "pending" && (
                        <>
                          <button
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Resend Invitation"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Cancel Invitation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="More Actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvitations.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              No invitations found matching your criteria.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageInvitationsPage;
