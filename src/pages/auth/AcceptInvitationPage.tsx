import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Mail,
  BookOpen,
  FileText,
  ShieldCheck,
  ArrowRight,
  School,
  MapPin,
  Phone,
  Heart,
  Crown,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../types/auth";

interface InvitationData {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  schoolName: string;
  schoolCode: string;
  invitedBy: string;
  expiresAt: Date;
  additionalInfo?: {
    department?: string;
    classGrade?: string;
    studentId?: string;
    employeeId?: string;
  };
  schoolBranding?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logo?: string;
  };
}

const AcceptInvitationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();

  const [invitationData, setInvitationData] = useState<InvitationData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyPhone: "",
    // Student specific
    parentEmail: "",
    // Teacher specific
    qualifications: "",
    experience: "",
    subjectSpecialization: "",
    // Parent specific
    occupation: "",
    relationship: "father",
    // Admin specific
    adminResponsibilities: "",
    managementExperience: "",
    // Secretary specific
    typingSpeed: "",
    previousExperience: "",
    computerSkills: "",
  });

  // Get invitation token and other params from URL
  const invitationToken = searchParams.get("token");
  const schoolParam = searchParams.get("school");
  const roleParam = searchParams.get("role") as UserRole;

  useEffect(() => {
    const fetchInvitationData = async () => {
      if (!invitationToken) {
        setError("Invalid invitation link");
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API call to fetch invitation data
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Extract role from URL parameters or decode from token
        let detectedRole: UserRole = roleParam || "teacher"; // fallback to teacher

        // Try to extract role from token if not in URL params
        if (!roleParam && invitationToken.includes("_")) {
          const tokenParts = invitationToken.split("_");
          if (tokenParts.length > 1) {
            const possibleRole = tokenParts[1].toLowerCase();
            if (
              [
                "admin",
                "teacher",
                "student",
                "parent",
                "secretary",
                "proprietor",
              ].includes(possibleRole)
            ) {
              detectedRole = possibleRole as UserRole;
            }
          }
        }

        // School branding based on school code
        const getSchoolBranding = (schoolCode: string) => {
          switch (schoolCode) {
            case "GHS001":
              return {
                primaryColor: "#1d4ed8",
                secondaryColor: "#10b981",
                accentColor: "#8b5cf6",
              };
            case "SMA001":
              return {
                primaryColor: "#dc2626",
                secondaryColor: "#f59e0b",
                accentColor: "#06b6d4",
              };
            case "OPS001":
              return {
                primaryColor: "#059669",
                secondaryColor: "#7c3aed",
                accentColor: "#f59e0b",
              };
            default:
              return {
                primaryColor: "#3B82F6",
                secondaryColor: "#10B981",
                accentColor: "#8b5cf6",
              };
          }
        };

        const currentSchool = schoolParam || "DEMO001";
        const branding = getSchoolBranding(currentSchool);

        // Mock invitation data with proper role detection
        const mockInvitation: InvitationData = {
          id: invitationToken,
          email: "john.smith@email.com", // In real app, this would come from the token
          role: detectedRole, // Use detected role instead of hardcoded
          firstName: "John",
          lastName: "Smith",
          schoolName:
            currentSchool === "GHS001"
              ? "Greenwood High School"
              : currentSchool === "SMA001"
              ? "St. Mary's Academy"
              : currentSchool === "OPS001"
              ? "Oakwood Primary School"
              : "Demo School",
          schoolCode: currentSchool,
          invitedBy: "Dr. Sarah Johnson",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          additionalInfo: getAdditionalInfoForRole(detectedRole),
          schoolBranding: branding,
        };

        setInvitationData(mockInvitation);
      } catch (err) {
        setError("Failed to load invitation details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitationData();
  }, [invitationToken, schoolParam, roleParam]);

  // Get role-specific additional info
  const getAdditionalInfoForRole = (role: UserRole) => {
    switch (role) {
      case "teacher":
        return { department: "Mathematics", employeeId: "EMP001" };
      case "student":
        return { classGrade: "grade-10", studentId: "STU001" };
      case "admin":
        return { department: "Administration", employeeId: "ADM001" };
      case "secretary":
        return { department: "Administration", employeeId: "SEC001" };
      case "parent":
        return { studentId: "STU002" };
      default:
        return {};
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!invitationData) return;

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Role-specific validation
    if (invitationData.role === "student" && !formData.parentEmail) {
      setError("Parent email is required for student accounts");
      return;
    }

    if (invitationData.role === "parent" && !formData.relationship) {
      setError("Relationship to student is required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create user account with role-specific data
      const registrationData = {
        email: invitationData.email,
        firstName: invitationData.firstName,
        lastName: invitationData.lastName,
        role: invitationData.role,
        schoolCode: invitationData.schoolCode,
        schoolName: invitationData.schoolName,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        // Role-specific fields
        ...(invitationData.role === "student" && {
          studentId: invitationData.additionalInfo?.studentId,
          classGrade: invitationData.additionalInfo?.classGrade,
          parentEmail: formData.parentEmail,
        }),
        ...(invitationData.role === "teacher" && {
          employeeId: invitationData.additionalInfo?.employeeId,
          department: invitationData.additionalInfo?.department,
          qualifications: formData.qualifications,
          experience: formData.experience,
          subjectSpecialization: formData.subjectSpecialization,
        }),
        ...(invitationData.role === "parent" && {
          occupation: formData.occupation,
          relationship: formData.relationship,
          parentStudentId: invitationData.additionalInfo?.studentId,
        }),
        ...(invitationData.role === "admin" && {
          employeeId: invitationData.additionalInfo?.employeeId,
          department: invitationData.additionalInfo?.department,
          adminResponsibilities: formData.adminResponsibilities,
          managementExperience: formData.managementExperience,
        }),
        ...(invitationData.role === "secretary" && {
          employeeId: invitationData.additionalInfo?.employeeId,
          department: invitationData.additionalInfo?.department,
          typingSpeed: formData.typingSpeed,
          previousExperience: formData.previousExperience,
          computerSkills: formData.computerSkills,
        }),
      };

      await register(registrationData);

      // Success - user is now logged in, redirect to school landing page
      navigate("/school");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "teacher":
        return <BookOpen className="w-6 h-6" />;
      case "student":
        return <GraduationCap className="w-6 h-6" />;
      case "parent":
        return <Heart className="w-6 h-6" />;
      case "secretary":
        return <FileText className="w-6 h-6" />;
      case "admin":
        return <ShieldCheck className="w-6 h-6" />;
      case "proprietor":
        return <Crown className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "teacher":
        return "blue";
      case "student":
        return "green";
      case "parent":
        return "pink";
      case "secretary":
        return "orange";
      case "admin":
        return "red";
      case "proprietor":
        return "purple";
      default:
        return "gray";
    }
  };

  const getRoleSpecificFields = () => {
    if (!invitationData) return null;

    switch (invitationData.role) {
      case "student":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.parentEmail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parentEmail: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="parent@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emergencyContact: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="Emergency contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Phone
                </label>
                <input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emergencyPhone: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>
            </div>
          </div>
        );

      case "teacher":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.qualifications}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    qualifications: e.target.value,
                  }))
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-none"
                placeholder="B.Ed Mathematics, M.Sc Mathematics"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teaching Experience
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="5 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Specialization
                </label>
                <input
                  type="text"
                  value={formData.subjectSpecialization}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subjectSpecialization: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="Mathematics, Physics"
                />
              </div>
            </div>
          </div>
        );

      case "parent":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship to Student{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.relationship}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      relationship: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="guardian">Guardian</option>
                  <option value="grandparent">Grandparent</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      occupation: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="Engineer, Doctor, etc."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact (if different from yourself)
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    emergencyContact: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="Emergency contact name and phone"
              />
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administrative Responsibilities{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.adminResponsibilities}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    adminResponsibilities: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Student management, academic oversight, staff coordination..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Management Experience
              </label>
              <input
                type="text"
                value={formData.managementExperience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    managementExperience: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="10 years in educational administration"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Educational Qualifications
              </label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    qualifications: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="M.Ed Administration, B.Ed, etc."
              />
            </div>
          </div>
        );

      case "secretary":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typing Speed (WPM)
                </label>
                <input
                  type="number"
                  value={formData.typingSpeed}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      typingSpeed: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="60"
                  min="0"
                  max="200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Experience
                </label>
                <input
                  type="text"
                  value={formData.previousExperience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      previousExperience: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="3 years as administrative assistant"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Computer Skills <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.computerSkills}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    computerSkills: e.target.value,
                  }))
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Microsoft Office Suite, Google Workspace, database management..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Educational Background
              </label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    qualifications: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="High School Diploma, Certificate in Office Administration"
              />
            </div>
          </div>
        );

      case "proprietor":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leadership Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.managementExperience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    managementExperience: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Educational leadership, business management, institutional oversight..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Educational Qualifications
              </label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    qualifications: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder="Ph.D Education, MBA, M.Ed, etc."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Invitation
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your invitation...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error && !invitationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
        >
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Invalid Invitation
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!invitationData) return null;

  const brandingStyle = invitationData.schoolBranding
    ? {
        background: `linear-gradient(135deg, ${invitationData.schoolBranding.primaryColor}, ${invitationData.schoolBranding.secondaryColor})`,
      }
    : {
        background: "linear-gradient(135deg, #3B82F6, #10B981)",
      };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={brandingStyle}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 text-center" style={brandingStyle}>
          <div className="flex items-center justify-center gap-3 mb-4">
            {invitationData.schoolBranding?.logo ? (
              <img
                src={invitationData.schoolBranding.logo}
                alt="School Logo"
                className="w-12 h-12 rounded-lg bg-white/20 p-2"
              />
            ) : (
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
            )}
            <h1 className="text-2xl font-bold text-white">
              {invitationData.schoolName}
            </h1>
          </div>
          <p className="text-white/90">
            Complete your {invitationData.role} account setup to get started
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Invitation Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 bg-${getRoleColor(
                  invitationData.role
                )}-100 rounded-xl flex items-center justify-center`}
              >
                <div
                  className={`text-${getRoleColor(invitationData.role)}-600`}
                >
                  {getRoleIcon(invitationData.role)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Welcome, {invitationData.firstName}!
                </h3>
                <p className="text-gray-600">
                  You've been invited to join as{" "}
                  <span className="font-medium capitalize bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {invitationData.role === "admin"
                      ? "an Administrator"
                      : invitationData.role === "proprietor"
                      ? "the Proprietor"
                      : `a ${invitationData.role}`}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{invitationData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Invited by {invitationData.invitedBy}</span>
              </div>
              {invitationData.additionalInfo?.department && (
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {invitationData.additionalInfo.department} Department
                  </span>
                </div>
              )}
              {invitationData.additionalInfo?.classGrade && (
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>
                    Class{" "}
                    {invitationData.additionalInfo.classGrade.replace(
                      "grade-",
                      ""
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Account Setup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Create Your{" "}
              {invitationData.role.charAt(0).toUpperCase() +
                invitationData.role.slice(1)}{" "}
              Account
            </h3>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </motion.div>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>

            {/* Role-specific Fields */}
            {getRoleSpecificFields()}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              style={{
                backgroundColor:
                  invitationData.schoolBranding?.primaryColor || "#3B82F6",
              }}
              whileHover={{
                scale: isSubmitting ? 1 : 1.02,
                backgroundColor:
                  invitationData.schoolBranding?.secondaryColor || "#10B981",
              }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Create{" "}
                  {invitationData.role.charAt(0).toUpperCase() +
                    invitationData.role.slice(1)}{" "}
                  Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to the school's terms of service
              and privacy policy.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AcceptInvitationPage;
