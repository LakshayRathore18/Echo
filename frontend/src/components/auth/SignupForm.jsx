import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";
import {
  cardVariants,
  itemVariants,
  logoVariants,
  buttonHoverTapVariants,
} from "./AnimationVariants"; // Adjust path if needed

const SignupForm = ({ onSignupSubmit, isSigningUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      console.error("All fields are required");
      return;
    }
    onSignupSubmit(formData);
  };

  // Define primary color RGB for button shading via CSS variable
  const primaryColorRGB = "66, 135, 245";

  return (
    <motion.div
      className="mt-4 w-full max-w-md space-y-4 sm:space-y-6 p-4 sm:p-6 bg-base-100/90 dark:bg-base-800/90 backdrop-blur-md rounded-2xl shadow-2xl z-10"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ '--color-primary-rgb': primaryColorRGB }}
    >
      {/* Logo/Icon Area */}
      <motion.div variants={logoVariants} className="flex justify-center mb-4">
        <div className="p-2 rounded-full bg-primary/20 dark:bg-primary/30">
          <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
        </div>
      </motion.div>

      {/* Title Area */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-base-content-dark">
          Create Account
        </h1>
        <p className="mt-1 text-base-content/70 dark:text-base-content-dark/70">
          Sign up to join Echo!
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <motion.div variants={itemVariants} className="form-control">
          <label className="label">
            <span className="label-text font-medium text-base-content dark:text-base-content-dark">
              Full Name
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-base-content/40 dark:text-base-content-dark/40" />
            </div>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full pl-10 pr-3 dark:bg-base-700 dark:border-base-600 focus:ring-primary focus:border-primary"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
        </motion.div>

        {/* Email Input */}
        <motion.div variants={itemVariants} className="form-control">
          <label className="label">
            <span className="label-text font-medium text-base-content dark:text-base-content-dark">
              Email
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-base-content/40 dark:text-base-content-dark/40" />
            </div>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full pl-10 pr-3 dark:bg-base-700 dark:border-base-600 focus:ring-primary focus:border-primary"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div variants={itemVariants} className="form-control">
          <label className="label">
            <span className="label-text font-medium text-base-content dark:text-base-content-dark">
              Password
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-base-content/40 dark:text-base-content-dark/40" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pl-10 pr-10 dark:bg-base-700 dark:border-base-600 focus:ring-primary focus:border-primary"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-base-content/80 dark:text-base-content-dark/50 dark:hover:text-base-content-dark/80 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            className={`btn btn-primary w-full text-lg font-semibold tracking-wide ${
              isSigningUp ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSigningUp}
            variants={buttonHoverTapVariants}
            whileHover={isSigningUp ? undefined : "hover"}
            whileTap={isSigningUp ? undefined : "tap"}
          >
            {isSigningUp ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Creating...
              </span>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Link to Login */}
      <motion.div variants={itemVariants} className="text-center pt-2">
        <p className="text-base-content/70 dark:text-base-content-dark/70 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary font-medium hover:underline">
            Log In Here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignupForm;