import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  Calculator,
  Calendar,
  ChartBar,
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Clock,
  Globe,
  Zap,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useScrollToTop } from "../hooks/useScrollToTop";

const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Automatically scroll to top when component mounts
  useScrollToTop();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Student Management",
      description:
        "Complete student records, enrollment, and academic tracking system",
    },
    {
      icon: <Calculator className="h-8 w-8 text-primary-600" />,
      title: "Fee Management",
      description:
        "Automated billing, payment tracking, and financial reporting",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary-600" />,
      title: "Academic Records",
      description: "Grade management, report cards, and performance analytics",
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-600" />,
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring with parent notifications",
    },
    {
      icon: <ChartBar className="h-8 w-8 text-primary-600" />,
      title: "Analytics & Reports",
      description: "Comprehensive insights and AI-powered performance analysis",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "Secure & Reliable",
      description: "Role-based access control with enterprise-grade security",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal, Greenwood Academy",
      content:
        "This system has transformed how we manage our school. Student tracking and parent communication has never been easier.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Administrator, Tech Valley School",
      content:
        "The fee management and automated reporting features have saved us countless hours each month.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher, Sunrise Elementary",
      content:
        "I love how easy it is to record grades and communicate with parents. The interface is so intuitive!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Schools Trust Us" },
    { number: "50K+", label: "Students Managed" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

      {/* Enhanced Mobile-Responsive Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="nav-glass fixed w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary-500" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">
                School<span className="text-primary-500">Flexi</span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/auth/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500"
                >
                  School Login
                </Button>
              </Link>
              <Link to="/auth/register-school">
                <motion.button
                  className="btn-primary-modern px-4 py-2 rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your School
                </motion.button>
              </Link>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50 text-gray-700 hover:text-primary-600 hover:bg-white hover:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? "Close menu" : "Open menu"}
                </span>
                <motion.div
                  animate={
                    isMobileMenuOpen
                      ? { opacity: 0, scale: 0.8 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
                <motion.div
                  animate={
                    isMobileMenuOpen
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <X className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
              }}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute right-0 top-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl border-l border-gray-200 overflow-y-auto z-[9999]"
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: "#ffffff",
                  position: "absolute",
                  zIndex: 9999,
                  right: 0,
                  top: 0,
                  height: "100vh",
                  width: "320px",
                  maxWidth: "85vw",
                }}
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      SchoolFlexi
                    </span>
                  </div>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="px-6 py-6 space-y-2">
                  {[
                    { href: "#features", label: "Features", icon: BookOpen },
                    { href: "#pricing", label: "Pricing", icon: Calculator },
                    { href: "#about", label: "About", icon: Users },
                    { href: "#contact", label: "Contact", icon: Calendar },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center space-x-4 px-4 py-4 rounded-2xl text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                        <item.icon className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
                      </div>
                      <span className="font-medium text-base">
                        {item.label}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="px-6 py-6 border-t border-gray-200/50 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Link
                      to="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.button
                        className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30 transition-all font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Users className="w-5 h-5" />
                        <span>School Login</span>
                      </motion.button>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Link
                      to="/auth/register-school"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.button
                        className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl transition-all font-medium"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Zap className="w-5 h-5" />
                        <span>Start Your School</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Trust Badge */}
                  <motion.div
                    className="text-center pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-50 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Trusted by 500+ schools
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-500/10 to-secondary-500/10 rounded-tl-[4rem] pointer-events-none" />
                <div className="absolute top-20 right-6 w-20 h-20 bg-gradient-to-br from-secondary-500/5 to-primary-500/5 rounded-2xl pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 md:pb-20">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-left space-y-6 lg:space-y-8 order-2 lg:order-1"
            >
              {/* Main Headline */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-gray-900">One platform to</span>
                <br />
                <span className="gradient-text">streamline all</span>
                <br />
                <span className="text-gray-900">school operations</span>
              </motion.h1>

              {/* Feature List */}
              <motion.div
                className="space-y-3 lg:space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Complete student management system
                  </span>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Real-time analytics and reporting
                  </span>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Seamless parent-teacher communication
                  </span>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Mobile-first design for everyone
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 lg:gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/auth/register-school" className="w-full sm:w-auto">
                  <motion.button
                    className="btn-secondary-modern px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl flex items-center justify-center w-full"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Your School
                  </motion.button>
                </Link>

                <motion.button
                  className="glass-effect px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl flex items-center justify-center border border-gray-200 hover:border-primary-300 transition-all text-gray-700 hover:text-primary-600 w-full sm:w-auto"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact us
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Mobile-Optimized Layered Interface Mockups */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-64 sm:h-80 md:h-96 lg:h-[600px] order-1 lg:order-2"
            >
              {/* Main Dashboard - Back Layer */}
              <motion.div
                className="absolute top-4 lg:top-8 left-0 w-56 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-96 card-glass rounded-2xl p-3 lg:p-6 shadow-2xl border border-white/50 transform rotate-3"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-between mb-2 lg:mb-4">
                  <div className="flex items-center space-x-1 lg:space-x-2">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                      <ChartBar className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 text-xs lg:text-base">
                      Analytics Dashboard
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-400 rounded-full"></div>
                  </div>
                </div>

                {/* Enhanced Chart Area */}
                <div className="h-16 sm:h-20 lg:h-32 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl mb-2 lg:mb-4 p-2 lg:p-4 relative overflow-hidden">
                  <div className="flex items-end space-x-1 lg:space-x-2 h-full">
                    <motion.div
                      className="w-2 lg:w-4 bg-primary-400 rounded-t"
                      style={{ height: "60%" }}
                      initial={{ height: 0 }}
                      animate={{ height: "60%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                    <motion.div
                      className="w-2 lg:w-4 bg-secondary-400 rounded-t"
                      style={{ height: "80%" }}
                      initial={{ height: 0 }}
                      animate={{ height: "80%" }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                    />
                    <motion.div
                      className="w-2 lg:w-4 bg-primary-300 rounded-t"
                      style={{ height: "40%" }}
                      initial={{ height: 0 }}
                      animate={{ height: "40%" }}
                      transition={{ duration: 1.5, delay: 1.4 }}
                    />
                    <motion.div
                      className="w-2 lg:w-4 bg-secondary-300 rounded-t"
                      style={{ height: "90%" }}
                      initial={{ height: 0 }}
                      animate={{ height: "90%" }}
                      transition={{ duration: 1.5, delay: 1.6 }}
                    />
                    <motion.div
                      className="w-2 lg:w-4 bg-primary-400 rounded-t"
                      style={{ height: "70%" }}
                      initial={{ height: 0 }}
                      animate={{ height: "70%" }}
                      transition={{ duration: 1.5, delay: 1.8 }}
                    />
                  </div>
                </div>

                <div className="space-y-1 lg:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">
                      Performance
                    </span>
                    <span className="text-xs lg:text-sm font-bold text-green-600">
                      ↗ +15%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 lg:h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1 lg:h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 2.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Student Records - Middle Layer - Adjusted for mobile */}
              <motion.div
                className="absolute top-8 sm:top-12 lg:top-24 right-0 w-48 sm:w-56 lg:w-72 h-40 sm:h-52 lg:h-80 card-glass rounded-2xl p-3 lg:p-5 shadow-xl border border-white/50 transform -rotate-2"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center justify-between mb-2 lg:mb-4">
                  <div className="flex items-center space-x-1 lg:space-x-2">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-secondary-500 rounded-lg flex items-center justify-center">
                      <Users className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 text-xs lg:text-base">
                      Student Records
                    </span>
                  </div>
                </div>

                {/* Enhanced Student List - Simplified for mobile */}
                <div className="space-y-1 lg:space-y-3">
                  <motion.div
                    className="flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs lg:text-sm font-bold">
                        SJ
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                        Sarah Johnson
                      </p>
                      <p className="text-xs text-gray-500">Grade 10A</p>
                    </div>
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"></div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7 }}
                  >
                    <div className="w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs lg:text-sm font-bold">
                        MC
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                        Michael Chen
                      </p>
                      <p className="text-xs text-gray-500">Grade 9B</p>
                    </div>
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"></div>
                  </motion.div>
                </div>

                <div className="mt-2 lg:mt-4 p-2 lg:p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-600">Students</p>
                      <motion.p
                        className="text-sm lg:text-lg font-bold text-primary-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                      >
                        1,247
                      </motion.p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Active</p>
                      <p className="text-sm lg:text-lg font-bold text-secondary-600">
                        1,156
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Mobile App - Front Layer - Optimized for mobile */}
              <motion.div
                className="absolute bottom-4 sm:bottom-8 left-8 sm:left-12 lg:left-16 w-32 sm:w-36 lg:w-48 h-48 sm:h-56 lg:h-80 card-glass rounded-3xl p-2 lg:p-4 shadow-2xl border border-white/50 transform rotate-6"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-2 lg:mb-4">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="text-xs font-bold text-gray-900">9:41</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-1.5 bg-green-400 rounded-sm"></div>
                  </div>
                </div>

                {/* Enhanced Mobile Content */}
                <div className="text-center mb-2 lg:mb-4">
                  <motion.div
                    className="w-6 h-6 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mx-auto mb-1 lg:mb-2 flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 3 }}
                  >
                    <GraduationCap className="w-4 h-4 lg:w-7 lg:h-7 text-white" />
                  </motion.div>
                  <p className="text-xs lg:text-sm font-bold text-gray-900">
                    SchoolFlexi
                  </p>
                  <p className="text-xs text-gray-500">Parent Portal</p>
                </div>

                {/* Enhanced Quick Actions */}
                <div className="grid grid-cols-2 gap-1 lg:gap-3 mb-2 lg:mb-4">
                  <motion.div
                    className="bg-primary-50 p-1.5 lg:p-3 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-3 h-3 lg:w-5 lg:h-5 text-primary-500 mb-1" />
                    <p className="text-xs font-medium text-primary-700">
                      Schedule
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-secondary-50 p-1.5 lg:p-3 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookOpen className="w-3 h-3 lg:w-5 lg:h-5 text-secondary-500 mb-1" />
                    <p className="text-xs font-medium text-secondary-700">
                      Grades
                    </p>
                  </motion.div>
                </div>

                {/* Enhanced Notifications - Simplified for mobile */}
                <div className="space-y-1 lg:space-y-2">
                  <motion.div
                    className="bg-green-50 p-1.5 lg:p-2 rounded-lg border-l-2 border-green-400"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.5 }}
                  >
                    <p className="text-xs font-medium text-green-700">
                      Assignment Done
                    </p>
                    <p className="text-xs text-green-600">Math homework</p>
                  </motion.div>
                  <motion.div
                    className="bg-blue-50 p-1.5 lg:p-2 rounded-lg border-l-2 border-blue-400"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3 }}
                  >
                    <p className="text-xs font-medium text-blue-700">
                      Parent Meeting
                    </p>
                    <p className="text-xs text-blue-600">Tomorrow 3PM</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Attendance Tracker - Floating Card - Hidden on mobile */}
              <motion.div
                className="hidden sm:block absolute top-24 lg:top-40 left-16 lg:left-24 w-24 lg:w-32 h-16 lg:h-24 card-glass rounded-xl p-2 lg:p-3 shadow-lg border border-white/50"
                animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
              >
                <div className="flex items-center justify-between mb-1 lg:mb-2">
                  <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-primary-500" />
                  <motion.span
                    className="text-xs font-bold text-green-600"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    98%
                  </motion.span>
                </div>
                <p className="text-xs text-gray-600">Attendance</p>
                <p className="text-xs font-bold text-gray-900">Today</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust Indicators - Mobile optimized */}
          <motion.div
            className="mt-12 lg:mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-xs lg:text-sm text-gray-500 mb-4 lg:mb-6 uppercase tracking-wide">
              TRUSTED BY 500+ SCHOOLS WORLDWIDE
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 opacity-60">
              <div className="text-sm lg:text-lg font-bold text-gray-400">
                Harvard Academy
              </div>
              <div className="text-sm lg:text-lg font-bold text-gray-400">
                Lincoln High
              </div>
              <div className="hidden sm:block text-sm lg:text-lg font-bold text-gray-400">
                Roosevelt Elementary
              </div>
              <div className="hidden md:block text-sm lg:text-lg font-bold text-gray-400">
                Washington Prep
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section - Mobile Responsive */}
      <section className="py-12 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center card-glass p-4 lg:p-8 rounded-2xl group hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="stats-counter text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm lg:text-base group-hover:text-gray-700 transition-colors">
                  {stat.label}
                </div>
                <motion.div
                  className="mt-2 lg:mt-4 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 + index * 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section - Mobile Responsive */}
      <section id="features" className="py-12 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mb-4"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Comprehensive Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              <span className="gradient-text">Everything Your School</span>
              <br />
              <span className="text-gray-900">Needs & More</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              From student enrollment to graduation, our AI-powered platform
              revolutionizes every aspect of school management with intuitive
              tools and real-time insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card group cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Gradient overlay that appears on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                <div className="relative z-10">
                  <div className="mb-4 lg:mb-6">
                    <motion.div
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center border border-primary-200/50 group-hover:border-primary-300 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {React.cloneElement(
                        feature.icon as React.ReactElement<{
                          className?: string;
                        }>,
                        {
                          className:
                            "h-6 w-6 lg:h-8 lg:w-8 text-primary-500 group-hover:text-primary-600 transition-colors",
                        }
                      )}
                    </motion.div>
                  </div>

                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-primary-700 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm lg:text-base text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn more link that appears on hover */}
                  <motion.div
                    className="mt-3 lg:mt-4 flex items-center text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="text-sm font-semibold">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional feature highlights - Mobile responsive */}
          <motion.div
            className="mt-12 lg:mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 p-4 lg:p-6 card-glass rounded-2xl">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">
                    99.9% Uptime
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Guaranteed reliability
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 p-4 lg:p-6 card-glass rounded-2xl">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">
                    Bank-level Security
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    SOC2 Type II certified
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 p-4 lg:p-6 card-glass rounded-2xl">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">
                    Lightning Fast
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Sub-second response times
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="inline-block px-4 py-2 bg-secondary-100 text-secondary-600 rounded-full text-sm font-semibold mb-6"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Why Choose SchoolFlexi
              </motion.span>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                <span className="text-gray-900">Transform Your School's</span>
                <br />
                <span className="gradient-text">Operations Today</span>
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <Clock className="h-6 w-6 text-primary-500" />,
                    title: "Reduce Administrative Workload",
                    description:
                      "Automate routine tasks and focus on what matters most - education. Save up to 20 hours per week.",
                    stat: "20+ hours saved weekly",
                  },
                  {
                    icon: <Users className="h-6 w-6 text-secondary-500" />,
                    title: "Improve Parent Engagement",
                    description:
                      "Real-time updates and seamless communication with families boost engagement by 40%.",
                    stat: "40% more engagement",
                  },
                  {
                    icon: <ChartBar className="h-6 w-6 text-primary-600" />,
                    title: "Data-Driven Decisions",
                    description:
                      "Comprehensive analytics to improve student outcomes with actionable insights.",
                    stat: "15% better outcomes",
                  },
                  {
                    icon: <Award className="h-6 w-6 text-secondary-600" />,
                    title: "Scale with Confidence",
                    description:
                      "From single schools to multi-campus districts, grow without limits.",
                    stat: "Unlimited scalability",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/50 transition-colors group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 mb-2 leading-relaxed">
                        {benefit.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                        {benefit.stat}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Enhanced Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-glass p-8 rounded-3xl shadow-2xl border border-white/50">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Real Impact
                  </h3>
                  <p className="text-gray-600">
                    See what schools achieve with SchoolFlexi
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Clock className="h-10 w-10 text-primary-500" />,
                      title: "Save Time",
                      stat: "20+ hrs",
                      description: "Per week saved on admin tasks",
                      color: "primary",
                    },
                    {
                      icon: <Award className="h-10 w-10 text-secondary-500" />,
                      title: "Improve Grades",
                      stat: "15%",
                      description: "Average improvement in student performance",
                      color: "secondary",
                    },
                    {
                      icon: (
                        <Smartphone className="h-10 w-10 text-primary-600" />
                      ),
                      title: "Mobile Ready",
                      stat: "100%",
                      description: "Access anywhere, anytime on any device",
                      color: "primary",
                    },
                    {
                      icon: <Globe className="h-10 w-10 text-secondary-600" />,
                      title: "Cloud Based",
                      stat: "99.9%",
                      description: "Uptime guarantee with automatic backups",
                      color: "secondary",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-4 rounded-2xl bg-white/30 hover:bg-white/50 transition-all group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="mb-4 flex justify-center"
                        whileHover={{ rotate: 5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <motion.div
                        className={`text-2xl font-bold mb-2 ${
                          item.color === "primary"
                            ? "text-primary-600"
                            : "text-secondary-600"
                        }`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 + index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        {item.stat}
                      </motion.div>
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-tight">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom highlight */}
                <motion.div
                  className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-gray-600 mb-1">
                    Trusted by educators worldwide
                  </p>
                  <p className="text-xl font-bold gradient-text">
                    500+ Schools & Growing
                  </p>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 card-glass rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-center">
                  <Sparkles className="w-8 h-8 text-primary-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">AI Powered</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-28 h-20 card-glass rounded-2xl p-3 shadow-lg"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="text-center">
                  <Shield className="w-6 h-6 text-secondary-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">
                    Secure & Safe
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mb-6"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Success Stories
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Trusted by Educators</span>
              <br />
              <span className="text-gray-900">Worldwide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what school administrators, teachers, and parents are saying
              about their experience with SchoolFlexi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card-glass p-8 rounded-3xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed group-hover:text-gray-800 transition-colors">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional social proof */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-white ${
                      i === 0
                        ? "bg-gradient-to-br from-blue-400 to-blue-500"
                        : i === 1
                        ? "bg-gradient-to-br from-green-400 to-green-500"
                        : i === 2
                        ? "bg-gradient-to-br from-purple-400 to-purple-500"
                        : i === 3
                        ? "bg-gradient-to-br from-pink-400 to-pink-500"
                        : "bg-gradient-to-br from-yellow-400 to-yellow-500"
                    }`}
                  />
                ))}
              </div>
              <div className="text-left ml-4">
                <p className="text-sm text-gray-600">
                  Join 500+ schools already using SchoolFlexi
                </p>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    4.9/5 average rating
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              className="inline-block card-glass px-8 py-4 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg font-semibold text-gray-900 mb-1">
                Ready to join them?
              </p>
              <p className="text-gray-600">
                Start your free trial today - no credit card required
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section - Mobile Responsive */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500"></div>
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Animated background elements - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="hidden lg:block absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-2xl"
            animate={{ rotate: [0, 45, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden lg:block absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden lg:block absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-lg"
            animate={{ rotate: [0, -45, 0], x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 lg:mb-6 border border-white/30"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Get Started?
            </motion.span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              Transform Your School
              <br />
              <span className="text-white/90">Starting Today</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of schools already using SchoolFlexi to streamline
              operations, improve communication, and enhance student outcomes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-8 lg:mb-12">
              <Link to="/auth/register-school" className="w-full sm:w-auto">
                <motion.button
                  className="btn-secondary-modern px-8 lg:px-10 py-4 lg:py-5 text-base lg:text-lg rounded-2xl flex items-center justify-center bg-white text-primary-600 hover:bg-gray-50 shadow-xl w-full"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Zap className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
                  Start Your School Free
                  <ArrowRight className="ml-2 lg:ml-3 h-5 w-5 lg:h-6 lg:w-6" />
                </motion.button>
              </Link>

              <motion.button
                className="px-8 lg:px-10 py-4 lg:py-5 text-base lg:text-lg rounded-2xl flex items-center justify-center text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm hover:bg-white/10 transition-all w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Calendar className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
                Schedule Demo
              </motion.button>
            </div>

            {/* Trust indicators - Mobile responsive */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-white/30">
                  <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">
                  Quick Setup
                </h3>
                <p className="text-sm lg:text-base text-white/80">
                  Get started in under 15 minutes
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-white/30">
                  <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">
                  No Risk
                </h3>
                <p className="text-sm lg:text-base text-white/80">
                  30-day money-back guarantee
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-white/30">
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">
                  Expert Support
                </h3>
                <p className="text-sm lg:text-base text-white/80">
                  24/7 dedicated customer success
                </p>
              </div>
            </motion.div>

            {/* Bottom highlight - Mobile responsive */}
            <motion.div
              className="mt-12 lg:mt-16 inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-white/80 text-sm lg:text-base">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                  <span>Free for 30 days</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer - Mobile Responsive */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

        <div className="relative">
          {/* Main Footer Content */}
          <div className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Company Info - Mobile first */}
                <motion.div
                  className="sm:col-span-2 lg:col-span-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4 lg:mb-6">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-3">
                      <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <span className="text-xl lg:text-2xl font-bold">
                      SchoolFlexi
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                    Empowering schools with modern management solutions. Join
                    thousands of educators worldwide who trust SchoolFlexi for
                    their daily operations.
                  </p>
                  <div className="flex space-x-3 lg:space-x-4">
                    {["Facebook", "Twitter", "LinkedIn", "YouTube"].map(
                      (social, index) => (
                        <motion.a
                          key={social}
                          href="#"
                          className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors group"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          <div className="w-4 h-4 lg:w-5 lg:h-5 bg-gray-400 group-hover:bg-white rounded"></div>
                        </motion.a>
                      )
                    )}
                  </div>
                </motion.div>

                {/* Product Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-white">
                    Product
                  </h3>
                  <ul className="space-y-3 lg:space-y-4">
                    {[
                      "Features",
                      "Pricing",
                      "Security",
                      "Integrations",
                      "Mobile App",
                      "API Access",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-sm lg:text-base"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Company Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-white">
                    Company
                  </h3>
                  <ul className="space-y-3 lg:space-y-4">
                    {[
                      "About Us",
                      "Our Story",
                      "Careers",
                      "Press",
                      "Partners",
                      "Contact",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-sm lg:text-base"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support & Resources - Mobile optimized */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="sm:col-span-2 lg:col-span-1"
                >
                  <h3 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-white">
                    Support
                  </h3>
                  <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                    {[
                      "Help Center",
                      "Documentation",
                      "Community",
                      "Training",
                      "Status Page",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-sm lg:text-base"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced Newsletter Signup - Better Desktop Design */}
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-3">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-lg">
                        Stay Updated
                      </h4>
                    </div>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                      Get the latest product updates, educational insights, and
                      exclusive offers delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-sm backdrop-blur-sm"
                      />
                      <motion.button
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all text-sm font-semibold shadow-lg hover:shadow-primary-500/25 flex items-center justify-center"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Subscribe for Free</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      No spam, unsubscribe at any time
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Mobile responsive */}
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                <motion.div
                  className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs lg:text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span>© 2024 SchoolFlexi. All rights reserved.</span>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      Cookies
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>All systems operational</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                    <span className="text-xs lg:text-sm text-gray-400">
                      SOC2 Certified
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
