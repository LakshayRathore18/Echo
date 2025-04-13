import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import {
  cardVariants, // Only needs card and internal item variants
  itemVariants,
  logoVariants,
  buttonHoverTapVariants,
} from "./AnimationVariants"; // Adjust path if needed

// Props expected: onLoginSubmit (function), isLoggingIn (boolean)
const LoginForm = ({ onLoginSubmit, isLoggingIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      console.error("Email and password are required");
      // Optionally, set an error state here and display it
      return;
    }
    onLoginSubmit(formData); // Call the function passed via props
  };

  // Define primary color RGB if needed for button variants, or configure via CSS variables
  const primaryColorRGB = "66, 135, 245";

  return (
    <motion.div
      className="w-full max-w-md space-y-6 sm:space-y-8 p-8 sm:p-10 bg-base-100/90 dark:bg-base-800/90 backdrop-blur-md rounded-2xl shadow-2xl z-10"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ '--color-primary-rgb': primaryColorRGB }} // For button shadow variant
    >
      {/* Logo/Icon Area */}
      <motion.div variants={logoVariants} className="flex justify-center mb-6">
        <div className="p-3 rounded-full bg-primary/20 dark:bg-primary/30">
          <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
        </div>
      </motion.div>

      {/* Title Area */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-base-content-dark">
          Echo Login
        </h1>
        <p className="mt-2 text-base-content/70 dark:text-base-content-dark/70">
          Welcome back! Access your messages.
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <motion.div variants={itemVariants} className="form-control">
          <label className="label">
            <span className="label-text font-medium text-base-content dark:text-base-content-dark">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-base-content/40 dark:text-base-content-dark/40" />
            </div>
            <input
              id="email" type="email"
              className={`input input-bordered w-full pl-10 pr-3 dark:bg-base-700 dark:border-base-600 focus:ring-primary focus:border-primary`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div variants={itemVariants} className="form-control">
          <label className="label">
            <span className="label-text font-medium text-base-content dark:text-base-content-dark">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-base-content/40 dark:text-base-content-dark/40" />
            </div>
            <input
              id="password" type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-10 pr-10 dark:bg-base-700 dark:border-base-600 focus:ring-primary focus:border-primary`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-base-content/80 dark:text-base-content-dark/50 dark:hover:text-base-content-dark/80 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            className={`btn btn-primary w-full text-lg font-semibold tracking-wide ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoggingIn}
            variants={buttonHoverTapVariants}
            whileHover={isLoggingIn ? undefined : "hover"}
            whileTap={isLoggingIn ? undefined : "tap"}
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
              </span>
            ) : ( "Log In" )}
          </motion.button>
        </motion.div>
      </form>

      {/* Link to Signup */}
      <motion.div variants={itemVariants} className="text-center pt-4">
        <p className="text-base-content/70 dark:text-base-content-dark/70 text-sm">
          No account yet?{" "}
          <Link to="/signup" className="link link-primary font-medium hover:underline">
            Sign Up Here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;