import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, SpringOptions } from 'framer-motion';

interface AnimatedNumProps {
  value: number;
  springConfig?: SpringOptions;  // Keep for backward compatibility
}

export const AnimatedNum: React.FC<AnimatedNumProps> = ({ value }) => {
  // Track if value increased for animation direction
  const [prevValue, setPrevValue] = useState(value);
  const increased = value > prevValue;
  
  // Update prevValue after animation renders
  useEffect(() => {
    // Small delay to ensure animation triggers first
    const timer = setTimeout(() => {
      setPrevValue(value);
    }, 50);
    return () => clearTimeout(timer);
  }, [value]);
  
  return (
    <div className="relative overflow-hidden h-6 w-5 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={value} // Force re-render on value change
          initial={{ 
            y: increased ? 20 : -20,
            opacity: 0,
            scale: increased ? 0.8 : 1.2
          }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: 1,
            color: increased ? ['#ffffff', '#a5f3fc', '#ffffff'] : '#ffffff'
          }}
          exit={{ 
            y: increased ? -20 : 20,
            opacity: 0,
            scale: increased ? 1.2 : 0.8,
            position: 'absolute'
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.2, 0.65, 0.3, 0.9] // Custom easing function for more bounce
          }}
          className="flex justify-center items-center"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};