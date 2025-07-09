import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const ForgotPasswordPage: React.FC = () => {
  // Automatically scroll to top when component mounts
  useScrollToTop();
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Verification Sent, 3: Success
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      startResendTimer();
    }, 2000);
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      // Simulate resend
      startResendTimer();
      // You would make an API call here
    }
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

      <div className="w-full max-w-md relative">
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
            {currentStep === 1 && "Reset Your Password"}
            {currentStep === 2 && "Check Your Email"}
            {currentStep === 3 && "Password Reset Sent!"}
          </h1>
          <p className="text-gray-600">
            {currentStep === 1 &&
              "Enter your email address and we'll send you a reset link"}
            {currentStep === 2 &&
              "We've sent a password reset link to your email"}
            {currentStep === 3 &&
              "Your password reset instructions have been sent"}
          </p>
        </motion.div>

        {/* Reset Form */}
        <motion.div
          className="card-glass p-8 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Email Input */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder-gray-400"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      We'll send a password reset link to this email address
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full btn-primary-modern py-4 rounded-xl text-base font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Reset Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Email Sent Confirmation */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-primary-500" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Reset Link Sent!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We've sent a password reset link to:
                  </p>
                  <p className="font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                    {email}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">What's next?</span>
                  </div>
                  <ul className="text-sm text-blue-600 space-y-1 text-left">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the reset link in the email</li>
                    <li>• Create a new secure password</li>
                    <li>• Sign in with your new password</li>
                  </ul>
                </div>

                {/* Resend Option */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Didn't receive the email?
                  </p>
                  <motion.button
                    onClick={handleResend}
                    disabled={resendTimer > 0}
                    className="inline-flex items-center space-x-2 px-4 py-2 text-primary-500 hover:text-primary-600 font-medium transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                    whileHover={{ scale: resendTimer > 0 ? 1 : 1.05 }}
                    whileTap={{ scale: resendTimer > 0 ? 1 : 0.95 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>
                      {resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : "Resend Email"}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to Login */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <Link
                to="/auth/login"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>

          {/* Help Section */}
          {currentStep === 2 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-3">
                If you continue to have problems, please contact support:
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  support@schoolhub.com
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> +1 (555) 123-4567
                </p>
              </div>
            </div>
          )}
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
            <span>All password resets are secure and encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
