import React, { useState, useEffect } from "react";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, School } from "lucide-react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../types/auth";

interface SchoolBranding {
  schoolName: string;
  schoolCode: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo?: string;
}

const LoginPage: React.FC = () => {
  // Automatically scroll to top when component mounts
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const { schoolCode } = useParams();
  const [currentStep, setCurrentStep] = useState(1); // 1 = school code, 2 = login form
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolCodeInput, setSchoolCodeInput] = useState("");
  const [error, setError] = useState("");
  const [schoolBranding, setSchoolBranding] = useState<SchoolBranding | null>(
    null
  );
  const [loadingBranding, setLoadingBranding] = useState(false);
  const [searchingSchool, setSearchingSchool] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Get school parameter from URL params or query params
  const schoolParam =
    schoolCode || searchParams.get("school") || searchParams.get("code");

  // If school param exists in URL, skip to step 2
  useEffect(() => {
    if (schoolParam) {
      setSchoolCodeInput(schoolParam);
      setCurrentStep(2);
      fetchSchoolBranding(schoolParam);
    }
  }, [schoolParam]);

  const fetchSchoolBranding = async (code: string) => {
    setLoadingBranding(true);
    try {
      // Simulate API call to fetch school branding
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock school branding data - replace with actual API call
      const mockSchoolBranding: SchoolBranding = {
        schoolName:
          code === "GHS001"
            ? "Greenwood High School"
            : code === "SMA001"
            ? "St. Mary's Academy"
            : code === "OPS001"
            ? "Oakwood Primary School"
            : "Sample School",
        schoolCode: code,
        primaryColor:
          code === "GHS001"
            ? "#2563eb"
            : code === "SMA001"
            ? "#dc2626"
            : code === "OPS001"
            ? "#059669"
            : "#3B82F6",
        secondaryColor:
          code === "GHS001"
            ? "#10b981"
            : code === "SMA001"
            ? "#f59e0b"
            : code === "OPS001"
            ? "#7c3aed"
            : "#10B981",
        accentColor: "#f59e0b",
        logo: undefined, // Could be a URL to school logo
      };

      setSchoolBranding(mockSchoolBranding);
    } catch (err) {
      console.error("Failed to load school branding:", err);
      setError("School not found. Please check your school code.");
    } finally {
      setLoadingBranding(false);
    }
  };

  const handleSchoolCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolCodeInput.trim()) return;

    setSearchingSchool(true);
    setError("");

    try {
      // Simulate school lookup
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation - in real app, this would check if school exists
      const validSchoolCodes = ["GHS001", "SMA001", "OPS001", "DEMO001"];

      if (!validSchoolCodes.includes(schoolCodeInput.toUpperCase())) {
        setError(
          "School not found. Please check your school code and try again."
        );
        return;
      }

      // Load school branding and proceed to step 2
      await fetchSchoolBranding(schoolCodeInput.toUpperCase());
      setCurrentStep(2);
    } catch (err) {
      setError("Failed to find school. Please try again.");
    } finally {
      setSearchingSchool(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Mock user lookup - in real app, this would query the database
      const mockUsers = [
        { email: "admin@school.com", role: "admin" as UserRole },
        { email: "teacher@school.com", role: "teacher" as UserRole },
        { email: "john@school.com", role: "teacher" as UserRole },
        { email: "proprietor@school.com", role: "proprietor" as UserRole },
        { email: "parent@school.com", role: "parent" as UserRole },
        { email: "student@school.com", role: "student" as UserRole },
      ];

      // Simulate API authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user in mock database
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      // Authenticate with determined role
      await login(email, password, user.role);

      // Redirect to school landing page instead of role-specific dashboard
      navigate("/school");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToSchoolCode = () => {
    setCurrentStep(1);
    setSchoolBranding(null);
    setEmail("");
    setPassword("");
    setError("");
  };

  // Create dynamic styles based on school branding
  const brandingStyle = schoolBranding
    ? {
        background: `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.secondaryColor})`,
      }
    : {
        background: "linear-gradient(135deg, #3B82F6, #10B981)",
      };

  const backgroundGradient = schoolBranding
    ? `bg-gradient-to-br from-[${schoolBranding.primaryColor}]/10 via-white to-[${schoolBranding.secondaryColor}]/10`
    : "bg-gradient-to-br from-primary-50 via-white to-secondary-50";

  return (
    <div
      className={`min-h-screen ${backgroundGradient} flex items-center justify-center p-4 relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: schoolBranding?.primaryColor || "#3B82F6" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: schoolBranding?.secondaryColor || "#10B981" }}
      ></div>

      <div className="w-full max-w-md relative">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center mb-6 group">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform"
              style={brandingStyle}
            >
              {schoolBranding?.logo ? (
                <img
                  src={schoolBranding.logo}
                  alt="School Logo"
                  className="w-8 h-8 rounded-lg"
                />
              ) : (
                <School className="h-7 w-7 text-white" />
              )}
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {schoolBranding ? (
                schoolBranding.schoolName
              ) : (
                <>
                  School
                  <span style={{ color: "#3B82F6" }}>Flexi</span>
                </>
              )}
            </span>
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {currentStep === 1 ? "Welcome!" : "Welcome Back!"}
          </h1>
          <p className="text-gray-600">
            {currentStep === 1
              ? "Enter your school code to get started"
              : schoolBranding
              ? `Sign in to access your ${schoolBranding.schoolName} dashboard`
              : "Sign in to access your school management dashboard"}
          </p>

          {loadingBranding && (
            <div className="mt-2">
              <div className="inline-flex items-center text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                Loading school information...
              </div>
            </div>
          )}
        </motion.div>

        {/* Step 1: School Code Input */}
        {currentStep === 1 && (
          <motion.div
            className="card-glass p-8 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSchoolCodeSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </motion.div>
              )}

              {/* School Code Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  School Code
                </label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={schoolCodeInput}
                    onChange={(e) =>
                      setSchoolCodeInput(e.target.value.toUpperCase())
                    }
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none transition-all placeholder-gray-400 text-center font-mono text-lg tracking-wider"
                    placeholder="Enter school code (e.g., GHS001)"
                    maxLength={10}
                    style={{
                      borderColor: schoolCodeInput ? "#10B981" : undefined,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Your school code can be found on your welcome email or contact
                  your school administrator
                </p>
              </div>

              {/* Continue Button */}
              <motion.button
                type="submit"
                disabled={searchingSchool || !schoolCodeInput.trim()}
                className="w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #10B981)",
                  boxShadow: "0 4px 14px 0 #3B82F640",
                }}
                whileHover={{ scale: searchingSchool ? 1 : 1.02 }}
                whileTap={{ scale: searchingSchool ? 1 : 0.98 }}
              >
                {searchingSchool ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Finding your school...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Demo Codes */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  Demo School Codes:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                  <button
                    type="button"
                    onClick={() => setSchoolCodeInput("GHS001")}
                    className="text-left hover:underline"
                  >
                    GHS001 - Greenwood High
                  </button>
                  <button
                    type="button"
                    onClick={() => setSchoolCodeInput("SMA001")}
                    className="text-left hover:underline"
                  >
                    SMA001 - St. Mary's Academy
                  </button>
                  <button
                    type="button"
                    onClick={() => setSchoolCodeInput("OPS001")}
                    className="text-left hover:underline"
                  >
                    OPS001 - Oakwood Primary
                  </button>
                  <button
                    type="button"
                    onClick={() => setSchoolCodeInput("DEMO001")}
                    className="text-left hover:underline"
                  >
                    DEMO001 - Demo School
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 2: Login Form */}
        {currentStep === 2 && (
          <motion.div
            className="card-glass p-8 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* School Info Header */}
            {schoolBranding && (
              <div
                className="mb-6 p-4 rounded-xl border-2 border-dashed"
                style={{
                  borderColor: schoolBranding.primaryColor + "40",
                  backgroundColor: schoolBranding.primaryColor + "10",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={brandingStyle}
                    >
                      <School className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {schoolBranding.schoolName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {schoolBranding.schoolCode}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={goBackToSchoolCode}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Change school
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </motion.div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none transition-all placeholder-gray-400"
                    onFocus={(e) => {
                      e.target.style.borderColor =
                        schoolBranding?.primaryColor || "#3B82F6";
                      e.target.style.boxShadow = `0 0 0 2px ${
                        schoolBranding?.primaryColor || "#3B82F6"
                      }20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none transition-all placeholder-gray-400"
                    onFocus={(e) => {
                      e.target.style.borderColor =
                        schoolBranding?.primaryColor || "#3B82F6";
                      e.target.style.boxShadow = `0 0 0 2px ${
                        schoolBranding?.primaryColor || "#3B82F6"
                      }20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Enter your password"
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 focus:ring-2"
                    style={
                      {
                        color: schoolBranding?.primaryColor || "#3B82F6",
                        "--tw-ring-color": `${
                          schoolBranding?.primaryColor || "#3B82F6"
                        }40`,
                      } as React.CSSProperties
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium transition-colors"
                  style={{
                    color: schoolBranding?.primaryColor || "#3B82F6",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all"
                style={{
                  background: schoolBranding
                    ? `linear-gradient(135deg, ${schoolBranding.primaryColor}, ${schoolBranding.secondaryColor})`
                    : "linear-gradient(135deg, #3B82F6, #10B981)",
                  boxShadow: schoolBranding
                    ? `0 4px 14px 0 ${schoolBranding.primaryColor}40`
                    : "0 4px 14px 0 #3B82F640",
                }}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm font-medium text-green-900 mb-2">
                  Demo Login Credentials:
                </p>
                <div className="grid grid-cols-1 gap-1 text-sm text-green-700">
                  <div>Admin: admin@school.com</div>
                  <div>Teacher: teacher@school.com</div>
                  <div>Proprietor: proprietor@school.com</div>
                  <div>Parent: parent@school.com</div>
                  <div>Student: student@school.com</div>
                  <div className="mt-1 font-medium">Password: any password</div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
