import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import AnimatedBackground from "../components/auth/AnimatedBackground";
import SignupForm from "../components/auth/SignupForm";
import { pageVariants } from "../components/auth/AnimationVariants"; // Adjust path if needed

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();

  return (
    <motion.div
      key="signupPage"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-base-200 dark:bg-base-900"
      style={{
        "--gradient-angle": "45deg",
        "--gradient-colors": "hsl(var(--p)/0.3), hsl(var(--s)/0.3), hsl(var(--a)/0.3)"
      }}
    >
      {/* Glitch border overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{
          background: `linear-gradient(var(--gradient-angle), transparent 48%, var(--gradient-colors) 50%, transparent 52%)`,
          backgroundSize: "200% 200%",
          filter: "url(#glitch)"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* SVG filter for glitch effect */}
      <svg className="hidden">
        <filter id="glitch">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.02" 
            numOctaves="3" 
            result="noise"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="2" 
            xChannelSelector="R" 
            yChannelSelector="B"
          />
        </filter>
      </svg>

      <AnimatedBackground />
      <SignupForm
        onSignupSubmit={signup}
        isSigningUp={isSigningUp}
      />
    </motion.div>
  );
};

export default SignupPage;