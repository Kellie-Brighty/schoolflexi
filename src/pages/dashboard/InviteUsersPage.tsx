import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Send,
  CheckCircle,
  GraduationCap,
  BookOpen,
  User,
  FileText,
  ShieldCheck,
  Copy,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../types/auth";

const InviteUsersPage: React.FC = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [invitedUser, setInvitedUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null>(null);

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

  const roleOptions = [
    {
      value: "teacher" as UserRole,
      label: "Teacher",
      icon: BookOpen,
      color: "blue",
    },
    {
      value: "student" as UserRole,
      label: "Student",
      icon: GraduationCap,
      color: "green",
    },
    {
      value: "parent" as UserRole,
      label: "Parent",
      icon: User,
      color: "purple",
    },
    {
      value: "secretary" as UserRole,
      label: "Secretary",
      icon: FileText,
      color: "orange",
    },
    {
      value: "admin" as UserRole,
      label: "Administrator",
      icon: ShieldCheck,
      color: "red",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Sending invitation:", formData);

      // Generate invitation URL (in real app, this would be returned from API)
      const invitationToken = "inv_token_" + Date.now();
      const schoolCode = user?.schoolCode || "DEFAULT";
      const generatedUrl = `${window.location.origin}/auth/accept-invitation?token=${invitationToken}&school=${schoolCode}`;
      console.log("Invitation URL:", generatedUrl);

      // Store the invitation URL and user data to display to user
      setInvitationUrl(generatedUrl);
      setInvitedUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
      });

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
      // Don't auto-hide success so user can copy the link
      // setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to send invitation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyInvitationUrl = async () => {
    if (!invitationUrl) return;

    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = invitationUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const sendAnotherInvitation = () => {
    setShowSuccess(false);
    setInvitationUrl(null);
    setCopySuccess(false);
    setInvitedUser(null);
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invite Users</h1>
            <p className="text-gray-600">
              Send invitations to teachers, students, parents, and staff
              members.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Invitation Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Send Invitation
          </h3>

          {showSuccess && invitationUrl && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="text-green-800 font-semibold">
                    Invitation Created Successfully!
                  </h4>
                  <p className="text-green-700 text-sm">
                    Copy the link below and send it to{" "}
                    {invitedUser?.firstName
                      ? `${invitedUser.firstName} ${invitedUser.lastName}`
                      : "the user"}
                  </p>
                </div>
              </div>

              {/* Invited User Info */}
              {invitedUser && (
                <div className="bg-white border border-green-200 rounded-lg p-4 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invitation Details:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Name:</span>{" "}
                      {invitedUser.firstName} {invitedUser.lastName}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Role:</span>{" "}
                      <span className="capitalize">{invitedUser.role}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-medium text-gray-900">Email:</span>{" "}
                      {invitedUser.email}
                    </div>
                  </div>
                </div>
              )}

              {/* Invitation URL Display */}
              <div className="bg-white border border-green-200 rounded-lg p-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invitation Link:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={invitationUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono text-gray-600 focus:outline-none focus:border-primary-500"
                  />
                  <button
                    onClick={copyInvitationUrl}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      copySuccess
                        ? "bg-green-600 text-white"
                        : "bg-primary-500 text-white hover:bg-primary-600"
                    }`}
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.open(invitationUrl, "_blank")}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview Invitation
                </button>
                <button
                  onClick={sendAnotherInvitation}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Send Another Invitation
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>💡 Tip:</strong> You can send this link via email,
                  WhatsApp, SMS, or any messaging platform. The invitation will
                  expire in 7 days.
                </p>
              </div>
            </motion.div>
          )}

          {!showSuccess && (
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
                        <span className="text-sm font-medium">
                          {role.label}
                        </span>
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
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
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
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
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
          )}
        </motion.div>

        {/* Email Preview */}
        {!showSuccess && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
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
          </motion.div>
        )}

        {/* Success State - Show Invitation Details */}
        {showSuccess && invitationUrl && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Invitation Ready to Share
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  What happens next?
                </h4>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                      1
                    </span>
                    <span>
                      Share the invitation link with the user via your preferred
                      method
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                      2
                    </span>
                    <span>
                      They'll click the link and see your school's branded
                      invitation page
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                      3
                    </span>
                    <span>
                      They'll create their account and gain access to your
                      school system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                      4
                    </span>
                    <span>
                      You can track their acceptance status in "Manage
                      Invitations"
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  💡 Sharing Options
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                  <div>• Email</div>
                  <div>• WhatsApp</div>
                  <div>• SMS/Text Message</div>
                  <div>• Slack/Teams</div>
                  <div>• In-person (QR code)</div>
                  <div>• Phone call (read URL)</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InviteUsersPage;
