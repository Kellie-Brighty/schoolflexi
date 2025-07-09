import React, { useState } from "react";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  Users,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  School,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  // Automatically scroll to top when component mounts
  useScrollToTop();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Role & Basic Info
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Step 2: Password & School Info
    password: "",
    confirmPassword: "",
    schoolCode: "",
    schoolName: "",

    // Step 3: Role-specific info
    studentId: "",
    classGrade: "",
    parentStudentId: "",
    department: "",
    employeeId: "",
  });

  const userRoles = [
    {
      id: "admin",
      label: "Administrator",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Full system access and management",
    },
    {
      id: "teacher",
      label: "Teacher",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Manage classes, attendance, and grades",
    },
    {
      id: "secretary",
      label: "Secretary",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Handle admissions and billing",
    },
    {
      id: "proprietor",
      label: "Proprietor/Owner",
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "School ownership and oversight",
    },
    {
      id: "parent",
      label: "Parent",
      icon: Users,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "View child's progress and communicate",
    },
    {
      id: "student",
      label: "Student",
      icon: GraduationCap,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Access assignments and results",
    },
  ];

  const currentRole = userRoles.find((role) => role.id === selectedRole);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement actual registration logic
      console.log("Registration data:", formData);
    }, 2000);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-lg relative">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center mb-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              School<span className="text-primary-500">Hub</span>
            </span>
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join thousands of schools using SchoolHub
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step === currentStep
                      ? "bg-primary-500 text-white"
                      : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-8 h-1 mx-1 transition-all ${
                      step < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          className="card-glass p-8 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Role Selection & Basic Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Role & Basic Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      Let's start with your role and basic details
                    </p>
                  </div>

                  {/* Role Selection */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      I am a <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary-300 focus:outline-none focus:border-primary-500 transition-all"
                      >
                        {currentRole ? (
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 ${currentRole.bgColor} rounded-lg flex items-center justify-center`}
                            >
                              <currentRole.icon
                                className={`w-5 h-5 ${currentRole.color}`}
                              />
                            </div>
                            <div className="text-left">
                              <span className="font-medium text-gray-900 block">
                                {currentRole.label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {currentRole.description}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">
                            Select your role
                          </span>
                        )}
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            showRoleDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showRoleDropdown && (
                        <motion.div
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden max-h-80 overflow-y-auto"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {userRoles.map((role) => (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => {
                                setSelectedRole(role.id);
                                setFormData((prev) => ({
                                  ...prev,
                                  role: role.id,
                                }));
                                setShowRoleDropdown(false);
                              }}
                              className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                            >
                              <div
                                className={`w-10 h-10 ${role.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                              >
                                <role.icon
                                  className={`w-5 h-5 ${role.color}`}
                                />
                              </div>
                              <div className="flex-1">
                                <span className="font-medium text-gray-900 block">
                                  {role.label}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {role.description}
                                </span>
                              </div>
                              {selectedRole === role.id && (
                                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                          placeholder="First name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Password & School Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Security & School Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      Create a secure password and provide school details
                    </p>
                  </div>

                  {/* School Information */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="schoolCode"
                        required
                        value={formData.schoolCode}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="Enter your school code"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Contact your school administrator for the school code
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                      placeholder="Enter your school name"
                    />
                  </div>

                  {/* Password Fields */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Role-specific Information */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Additional Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      Role-specific details to complete your profile
                    </p>
                  </div>

                  {/* Role-specific fields */}
                  {(selectedRole === "student" ||
                    selectedRole === "parent") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {selectedRole === "student"
                          ? "Student ID"
                          : "Child's Student ID"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name={
                          selectedRole === "student"
                            ? "studentId"
                            : "parentStudentId"
                        }
                        required
                        value={
                          selectedRole === "student"
                            ? formData.studentId
                            : formData.parentStudentId
                        }
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder={
                          selectedRole === "student"
                            ? "Enter your student ID"
                            : "Enter your child's student ID"
                        }
                      />
                    </div>
                  )}

                  {selectedRole === "student" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Class/Grade <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="classGrade"
                        required
                        value={formData.classGrade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                      >
                        <option value="">Select your class</option>
                        <option value="nursery">Nursery</option>
                        <option value="primary-1">Primary 1</option>
                        <option value="primary-2">Primary 2</option>
                        <option value="primary-3">Primary 3</option>
                        <option value="primary-4">Primary 4</option>
                        <option value="primary-5">Primary 5</option>
                        <option value="primary-6">Primary 6</option>
                        <option value="jss-1">JSS 1</option>
                        <option value="jss-2">JSS 2</option>
                        <option value="jss-3">JSS 3</option>
                        <option value="ss-1">SS 1</option>
                        <option value="ss-2">SS 2</option>
                        <option value="ss-3">SS 3</option>
                      </select>
                    </div>
                  )}

                  {(selectedRole === "teacher" || selectedRole === "admin") && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Employee ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="employeeId"
                          required
                          value={formData.employeeId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                          placeholder="Enter your employee ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Department
                        </label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                          placeholder="Enter your department"
                        />
                      </div>
                    </>
                  )}

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-primary-500 hover:text-primary-600 font-medium"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-primary-500 hover:text-primary-600 font-medium"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        I would like to receive updates and announcements from
                        SchoolHub
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </motion.button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedRole && currentStep === 1}
                  className="flex items-center space-x-2 btn-primary-modern px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 btn-primary-modern px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary-500 hover:text-primary-600 font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your information is protected with bank-level security</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
 