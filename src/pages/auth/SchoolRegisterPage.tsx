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
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  School,
  Building,
  MapPin,
  Globe,
  Upload,
  Sparkles,
  Crown,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { SchoolRegistrationData } from "../../types/auth";

const SchoolRegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // Automatically scroll to top when component mounts or step changes
  useScrollToTop([currentStep]);
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(
    null
  );
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SchoolRegistrationData>({
    // Step 1: Proprietor Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",

    // Step 2: School Information
    schoolName: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolEmail: "",
    subdomain: "",

    // Step 3: Branding
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate subdomain from school name
    if (name === "schoolName" && value) {
      const generatedSubdomain = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 20);

      setFormData((prev) => ({
        ...prev,
        subdomain: generatedSubdomain,
      }));
    }

    // Check subdomain availability when changed
    if (name === "subdomain" && value.length > 2) {
      checkSubdomainAvailability(value);
    }
  };

  const checkSubdomainAvailability = async (_subdomain: string) => {
    setCheckingSubdomain(true);
    // Simulate API call
    setTimeout(() => {
      setSubdomainAvailable(Math.random() > 0.3); // 70% chance available
      setCheckingSubdomain(false);
    }, 800);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Helper function to check if current step is valid
  const isStepValid = (step: number): boolean => {
    if (step === 1) {
      return !!(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.password
      );
    }
    if (step === 2) {
      return !!(
        formData.schoolName &&
        formData.schoolAddress &&
        formData.schoolPhone &&
        formData.schoolEmail &&
        formData.subdomain &&
        subdomainAvailable !== false
      );
    }
    return true; // Step 3 validation is handled by form submission
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only allow submission on step 3
    if (currentStep !== 3) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate school creation process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create proprietor user account using AuthContext
      const proprietorData = {
        role: "proprietor" as const,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        schoolCode: formData.subdomain.toUpperCase(),
        schoolName: formData.schoolName,
      };

      // Register and auto-login the proprietor
      await register(proprietorData);

      // Navigate to proprietor dashboard (user is now authenticated)
      navigate(`/dashboard/proprietor`);
    } catch (error) {
      console.error("School registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent form submission on Enter key unless on step 3
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && currentStep !== 3) {
      e.preventDefault();
      // Trigger next step if validation passes
      if (currentStep < 3 && isStepValid(currentStep)) {
        handleNext();
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const steps = [
    {
      number: 1,
      title: "Your Information",
      description: "Tell us about yourself as the school owner",
    },
    {
      number: 2,
      title: "School Details",
      description: "Basic information about your school",
    },
    {
      number: 3,
      title: "Branding & Setup",
      description: "Customize your school's online presence",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl relative">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center mb-6 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              School<span className="text-primary-500">Flexi</span>
            </span>
          </Link>

          <div className="flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-yellow-500 mr-2" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Create Your School
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Join hundreds of schools using SchoolFlexi
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>Trusted by 500+ schools worldwide</span>
          </div>

          {/* Enhanced Progress Indicator */}
          <div className="mt-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        step.number === currentStep
                          ? "bg-primary-500 text-white shadow-lg scale-110"
                          : step.number < currentStep
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-xs font-medium ${
                          step.number === currentStep
                            ? "text-primary-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-4 transition-all duration-300 ${
                        step.number < currentStep
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Form Container */}
        <motion.div
          className="card-glass p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
            <AnimatePresence mode="wait">
              {/* Step 1: Proprietor Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Tell Us About Yourself
                    </h3>
                    <p className="text-gray-600">
                      As the school owner, you'll have full control over your
                      school's system
                    </p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                          placeholder="Your first name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                        placeholder="owner@yourschool.com"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      This will be your login email and primary contact
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
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
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Password must contain:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One number</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: School Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <School className="w-8 h-8 text-secondary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      About Your School
                    </h3>
                    <p className="text-gray-600">
                      Basic information that will be displayed on your school's
                      system
                    </p>
                  </div>

                  {/* School Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      School Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="schoolName"
                        required
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                        placeholder="Greenwood Academy"
                      />
                    </div>
                  </div>

                  {/* School Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      School Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <textarea
                        name="schoolAddress"
                        required
                        value={formData.schoolAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg resize-none"
                        placeholder="123 Education Street, Knowledge City, State 12345"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        School Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="schoolPhone"
                          required
                          value={formData.schoolPhone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        School Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="schoolEmail"
                          required
                          value={formData.schoolEmail}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                          placeholder="info@greenwoodacademy.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subdomain Preview */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Your School's Web Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <div className="flex">
                        <input
                          type="text"
                          name="subdomain"
                          required
                          value={formData.subdomain}
                          onChange={handleInputChange}
                          className="flex-1 pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-l-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
                          placeholder="greenwood-academy"
                        />
                        <div className="px-4 py-4 bg-gray-100 border border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-lg">
                          .schoolflexi.com
                        </div>
                      </div>
                    </div>

                    {/* Subdomain Status */}
                    <div className="mt-2">
                      {checkingSubdomain && (
                        <div className="flex items-center text-sm text-blue-600">
                          <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                          Checking availability...
                        </div>
                      )}
                      {!checkingSubdomain &&
                        subdomainAvailable === true &&
                        formData.subdomain && (
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {formData.subdomain}.schoolflexi.com is available!
                          </div>
                        )}
                      {!checkingSubdomain &&
                        subdomainAvailable === false &&
                        formData.subdomain && (
                          <div className="flex items-center text-sm text-red-600">
                            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
                            This subdomain is already taken. Try another one.
                          </div>
                        )}
                      <p className="text-xs text-gray-500 mt-1">
                        This will be your school's unique web address
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Branding & Setup */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Customize Your Brand
                    </h3>
                    <p className="text-gray-600">
                      Make your school's system look unique and professional
                    </p>
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      School Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag & drop your school logo here, or{" "}
                        <button
                          type="button"
                          className="text-primary-500 hover:text-primary-600 font-semibold"
                        >
                          browse files
                        </button>
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG up to 2MB. Recommended: 200x200px
                      </p>
                    </div>
                  </div>

                  {/* Color Scheme */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          name="primaryColor"
                          value={formData.primaryColor}
                          onChange={handleInputChange}
                          className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={formData.primaryColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                primaryColor: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          name="secondaryColor"
                          value={formData.secondaryColor}
                          onChange={handleInputChange}
                          className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={formData.secondaryColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                secondaryColor: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                            placeholder="#10B981"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Preview
                    </label>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: formData.primaryColor }}
                          >
                            <School className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-gray-900">
                            {formData.schoolName || "Your School Name"}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <div
                            className="px-3 py-1 rounded text-white text-sm"
                            style={{ backgroundColor: formData.primaryColor }}
                          >
                            Dashboard
                          </div>
                          <div
                            className="px-3 py-1 rounded text-white text-sm"
                            style={{ backgroundColor: formData.secondaryColor }}
                          >
                            Students
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <div className="text-sm text-gray-600">
                        <p>
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-primary-500 hover:text-primary-600 font-semibold"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-primary-500 hover:text-primary-600 font-semibold"
                          >
                            Privacy Policy
                          </a>
                          . I understand that I will be responsible for managing
                          user access to my school's system.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </motion.button>
              ) : (
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              )}

              {currentStep < 3 ? (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(
                      "Continue button clicked, current step:",
                      currentStep
                    );
                    console.log("Step validation:", isStepValid(currentStep));
                    console.log("Form data:", formData);
                    console.log("Subdomain available:", subdomainAvailable);
                    if (isStepValid(currentStep)) {
                      handleNext();
                    }
                  }}
                  disabled={!isStepValid(currentStep)}
                  className="flex items-center space-x-2 btn-primary-modern px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 btn-primary-modern px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating School...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5" />
                      <span>Create School</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have a school account?{" "}
            <Link
              to="/auth/login"
              className="text-primary-500 hover:text-primary-600 font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </motion.div>

        {/* Enhanced Security Badge */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Bank-level security • SOC2 certified • GDPR compliant</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolRegisterPage;
