// AnimatedBackground.jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBlob = ({ path, colorClass, sizeClass, initial, animate, style }) => (
  <motion.svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute ${sizeClass} ${colorClass} opacity-30 dark:opacity-20 filter blur-xl pointer-events-none`}
    style={style}
  >
    <motion.path
      fill="currentColor"
      d={path}
      transform="translate(100 100)"
      initial={initial}
      animate={animate}
    />
  </motion.svg>
);

const RotatingShape = ({ children, sizeClass, initial, animate, style }) => (
  <motion.div
    className={`absolute ${sizeClass} border-2 border-current opacity-10 dark:opacity-5 pointer-events-none rounded-lg`}
    style={style}
    initial={initial}
    animate={animate}
  >
    {children}
  </motion.div>
);

const AnimatedWaves = () => {
  const waveVariants = {
    animate: {
      pathLength: [0, 1, 0],
      opacity: [0.2, 0.6, 0.2],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <svg className="absolute inset-0 w-full h-full z-[-25]" viewBox="0 0 100 100">
      {[...Array(3)].map((_, i) => (
        <motion.path
          key={i}
          d={`
            M ${Math.random() * 100} ${Math.random() * 100}
            Q ${Math.random() * 150} ${Math.random() * 50}, 
              ${Math.random() * 100} ${Math.random() * 100}
            T ${Math.random() * 100} ${Math.random() * 100}
          `}
          fill="none"
          stroke={`hsl(var(--${i % 2 === 0 ? 'p' : 's'})/0.3)`}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate="animate"
          variants={waveVariants}
          style={{
            transform: `scale(${Math.random() * 0.5 + 0.8})`,
            transformOrigin: `${Math.random() * 100}% ${Math.random() * 100}%`
          }}
        />
      ))}
    </svg>
  );
};

const RotatingPrisms = () => {
  return (
    <div className="absolute inset-0 z-[-20] overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 rounded-lg"
          style={{
            background: `linear-gradient(
              ${Math.random() * 360}deg,
              hsl(var(--p)/0.2),
              hsl(var(--s)/0.2),
              hsl(var(--a)/0.2)
            )`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            transformStyle: "preserve-3d"
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [360, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Sparkles = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 z-[-15] overflow-hidden"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 5, repeat: Infinity }}
    >
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/50"
          style={{
            left: mousePos.x + Math.random() * 200 - 100,
            top: mousePos.y + Math.random() * 200 - 100
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0.8, 1, 0],
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  );
};


// main component
const AnimatedBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxStrength = 25;
  const blobX = useTransform(mouseX, [0, window.innerWidth], [-parallaxStrength, parallaxStrength]);
  const blobY = useTransform(mouseY, [0, window.innerHeight], [-parallaxStrength, parallaxStrength]);
  const shapeX = useTransform(mouseX, [0, window.innerWidth], [parallaxStrength/2, -parallaxStrength/2]);
  const shapeY = useTransform(mouseY, [0, window.innerHeight], [parallaxStrength/2, -parallaxStrength/2]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const backgroundVariants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 40, ease: "linear", repeat: Infinity }
    },
  };

  const blobPath1 = "M48.8,-63.5C63.4,-51.1,75.3,-36.1,78.9,-20C82.5,-3.9,77.8,13.3,69.3,28.9C60.8,44.5,48.5,58.5,33.6,66.7C18.7,74.9,1.2,77.3,-15.8,73.5C-32.8,69.7,-49.3,59.7,-62.5,46.1C-75.7,32.5,-85.6,15.3,-83.9,0C-82.1,-15.4,-68.8,-29,-55.6,-42.1C-42.5,-55.2,-29.6,-67.8,-14.8,-72.5C-0.1,-77.2,16.5,-73.9,32.1,-70.1C47.7,-66.3,52.3,-61.9,48.8,-63.5Z";
  const blobPath2 = "M53.5,-51.8C68.6,-37.9,79.6,-19,79.1,-0.6C78.6,17.8,66.6,35.6,51,49.2C35.4,62.8,15.1,72.3,-5.5,73.6C-26.1,74.9,-47,68.1,-59.2,53.9C-71.5,39.7,-75.1,18.1,-71.2,0.2C-67.4,-17.6,-62.7,-32,-57.4,-45.4C-52.4,-58.8,-46.9,-71.2,-30.4,-72.5C-14.8,-73.8,-16,-81.3,-38.8,73.6C-52.8,58.7,-64.9,47.9,-72.2,34.8C-79.5,21.7,-83.5,6.3,-77.8,-6.6C-73.6,-19.5,-62.7,-29.9,-51.9,-38.6C-41.1,-47.4,-30.4,-54.5,-19.1,-60.8C-7.8,-67.1,4.1,-72.6,16.4,-72.8C28.7,-73,41.5,-67.1,41.5,-57.1Z";
  const blobPath3 = "M41.5,-57.1C54.9,-48.8,67.7,-38.3,74.4,-25.3C81.1,-12.3,81.7,3.1,75.4,15.8C69.1,28.5,55.9,38.5,43.4,48.2C30.9,57.9,19.1,67.3,5.1,70.8C-8.9,74.3,-24.8,71.9,-38.8,65.3C-52.8,58.7,-64.9,47.9,-72.2,34.8C-79.5,21.7,-83.5,6.3,-77.8,-6.6C-75.9,-19.5,-67.8,-30.1,-57.4,-40.1C-47,-50.1,-34.2,-56.8,-21.5,-62.7C-8.8,-68.6,-4.4,-73.7,2.6,-74.8C9.6,-75.9,19.2,-73.1,27.9,-70.1C36.6,-67.1,36.6,-64.1,36.6,-57.1Z";
  const blobPath4 = "M36.6,-64.1C48.8,-56.8,61.1,-49.1,68.8,-38.1C76.5,-27.1,79.7,-13.6,79.9,0.4C80.1,14.4,77.3,28.8,69.5,40.8C61.7,52.7,48.9,62.2,35.5,69.9C22.1,77.7,8.1,83.6,-5.5,84.5C-19.1,85.4,-32.3,81.3,-45.1,73.6C-57.9,65.9,-70.3,54.6,-76.7,41.1C-83.1,27.7,-83.5,12.1,-79.7,-2.3C-75.9,-16.8,-62.7,-30.1,-57.4,-40.1C-47,-50.1,-34.2,-56.8,-21.5,-62.7C-8.8,-68.6,-4.4,-73.7,2.6,-74.8C9.6,-75.9,19.2,-73.1,27.9,-70.1C36.6,-67.1,36.6,-64.1,36.6,-64.1Z";

  return (
    <>
      <motion.div
        className="absolute inset-0 z-[-10]"
        style={{
          background: `linear-gradient(135deg, hsl(var(--p)/0.6), hsl(var(--s)/0.6), hsl(var(--a)/0.6))`,
          backgroundSize: "400% 400%",
        }}
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      />
      
      <div className="absolute inset-0 z-[-5] overflow-hidden">
        <AnimatedBlob 
          path={blobPath1} 
          colorClass="text-primary" 
          sizeClass="w-96 h-96" 
          style={{ x: blobX, y: blobY }} 
          initial={{ x: '-20%', y: '-20%', rotate: 0, scale: 1 }} 
          animate={{ 
            x: ['-20%', '20%', '-20%'], 
            y: ['-20%', '30%', '-20%'], 
            rotate: [0, 90, 0], 
            scale: [1, 1.2, 1], 
            transition: { duration: 40, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' } 
          }} 
        />
        <AnimatedBlob 
          path={blobPath2} 
          colorClass="text-secondary" 
          sizeClass="w-80 h-80" 
          style={{ x: blobX, y: blobY }} 
          initial={{ x: '70%', y: '60%', rotate: 45, scale: 1.1 }} 
          animate={{ 
            x: ['70%', '40%', '70%'], 
            y: ['60%', '10%', '60%'], 
            rotate: [45, -45, 45], 
            scale: [1.1, 0.9, 1.1], 
            transition: { duration: 35, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse', delay: 5 } 
          }} 
        />
        <AnimatedBlob 
          path={blobPath3} 
          colorClass="text-accent" 
          sizeClass="w-[500px] h-[500px]" 
          style={{ x: blobX, y: blobY }} 
          initial={{ x: '10%', y: '70%', rotate: -30, scale: 0.9 }} 
          animate={{ 
            x: ['10%', '60%', '10%'], 
            y: ['70%', '20%', '70%'], 
            rotate: [-30, 30, -30], 
            scale: [0.9, 1.1, 0.9], 
            transition: { duration: 50, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse', delay: 10 } 
          }} 
        />
        <AnimatedBlob 
          path={blobPath4} 
          colorClass="text-info" 
          sizeClass="w-72 h-72" 
          style={{ x: blobX, y: blobY }} 
          initial={{ x: '80%', y: '-10%', rotate: 10, scale: 1 }} 
          animate={{ 
            x: ['80%', '50%', '80%'], 
            y: ['-10%', '40%', '-10%'], 
            rotate: [10, -50, 10], 
            scale: [1, 0.8, 1], 
            transition: { duration: 45, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse', delay: 3 } 
          }} 
        />
        
        <RotatingShape 
          sizeClass="w-60 h-60" 
          style={{ x: shapeX, y: shapeY, top: '15%', left: '20%' }} 
          initial={{ rotate: 0 }} 
          animate={{ 
            rotate: 360, 
            transition: { duration: 60, repeat: Infinity, ease: 'linear' } 
          }} 
        />
        <RotatingShape 
          sizeClass="w-40 h-40" 
          style={{ x: shapeX, y: shapeY, top: '65%', left: '70%' }} 
          initial={{ rotate: 45 }} 
          animate={{ 
            rotate: -315, 
            transition: { duration: 50, repeat: Infinity, ease: 'linear' } 
          }} 
        />
        <RotatingShape 
          sizeClass="w-52 h-52" 
          style={{ x: shapeX, y: shapeY, top: '50%', left: '5%' }} 
          initial={{ rotate: -20 }} 
          animate={{ 
            rotate: 340, 
            transition: { duration: 70, repeat: Infinity, ease: 'linear', delay: 5 } 
          }} 
        />
        
        <AnimatedWaves />
        <RotatingPrisms />
        <Sparkles />
      </div>
    </>
  );
};

export default AnimatedBackground;