// Variants for the overall page transition (if using animated routes)
export const pageVariants = {
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5 } },
  exit: { opacity: 0, filter: "blur(4px)", transition: { duration: 0.3 } },
};

// Variants for the main login card container
export const cardVariants = {
  hidden: { opacity: 0, scale: 0.7, rotateY: 90 }, // Start scaled down and rotated
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      duration: 0.8, // Explicit duration can help control spring
      delay: 0.2,
      when: "beforeChildren", // Ensure card animates before items inside
      staggerChildren: 0.15, // Stagger animation of children slightly more
    },
  },
};

// Variants for individual items within the card (more dynamic entry)
export const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: -45 }, // Start lower, smaller, rotated
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 120, // A bit stiffer for a quicker pop
      damping: 12,
    },
  },
};

// Specific variant for the top logo/icon for a unique entrance
export const logoVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.5, rotate: -180 }, // Fly down and rotate
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
      delay: 0.5, // Delay logo a bit more so card can settle
    },
  },
};

// Variants for button hover/tap interactions
export const buttonHoverTapVariants = {
  hover: {
    scale: 1.08, // More pronounced scale
    // Add a subtle glow or more intense shadow
    boxShadow: "0px 8px 25px rgba(var(--color-primary-rgb), 0.3)", // Assuming you have --color-primary-rgb CSS var
    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)", // Subtle text glow
    transition: { type: "spring", stiffness: 350, damping: 15 },
  },
  tap: {
    scale: 0.92, // More pronounced shrink
    boxShadow: "0px 4px 15px rgba(var(--color-primary-rgb), 0.2)",
  },
};

// Variants for the background animation
export const backgroundVariants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // Animate back and forth
    transition: {
      duration: 30, // Slower, more ambient
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// Basic input field animation (e.g., border color)
export const inputFocusVariants = {
  rest: { borderColor: "hsl(var(--bc) / 0.2)" }, // Use DaisyUI base content color with opacity
  focus: {
    borderColor: "hsl(var(--p))", // Use DaisyUI primary color
    scale: 1.02, // Slight scale on focus
    boxShadow: "0 0 0 2px hsl(var(--p) / 0.3)", // Add a focus ring effect
    transition: { type: "tween", duration: 0.2 },
  },
};

// Example Label animation for floating effect (more complex setup needed in component)
export const floatingLabelVariants = {
  inactive: { y: 0, scale: 1, opacity: 0.7 },
  active: { y: -22, scale: 0.85, opacity: 1 }, // Adjust y based on your input padding/size
};
