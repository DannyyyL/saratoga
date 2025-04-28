import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame } from "lucide-react";

interface AnimatedNumProps {
  value: number;
  showIcon?: boolean;
}

export const AnimatedNum: React.FC<AnimatedNumProps> = ({ 
  value, 
  showIcon = true
}) => {
  // Track value changes
  const [prevValue, setPrevValue] = useState(value);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    // Only animate if value actually changed
    if (value !== prevValue) {
      setShouldAnimate(true);
      
      // Reset animation flag after animation duration
      const timer = setTimeout(() => {
        setShouldAnimate(false);
        setPrevValue(value);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);
  
  // Determine animation type
  const increased = value > prevValue;
  const wasReset = prevValue > 0 && value === 0;
  
  // Define animations
  const numberVariants = {
    increased: {
      scale: [1, 1.2, 1],
      color: ['#ffffff', '#a5f3fc', '#ffffff'],
      transition: { duration: 0.5 }
    },
    decreased: {
      scale: [1, 0.9, 1],
      color: ['#ffffff', '#ef4444', '#ffffff'],
      transition: { duration: 0.5 }
    },
    idle: {
      scale: 1,
      color: '#ffffff'
    }
  };
  
  const flameVariants = {
    reset: {
      scale: [1, 1.4, 1],
      color: ['#ffffff', '#ef4444', '#ffffff'],
      transition: { duration: 0.5 }
    },
    increased: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    },
    idle: {
      scale: 1
    }
  };
  
  // Determine which animation to use
  const numberAnimation = shouldAnimate
    ? (increased ? 'increased' : 'decreased')
    : 'idle';
    
  const flameAnimation = shouldAnimate
    ? (wasReset ? 'reset' : (increased ? 'increased' : 'idle'))
    : 'idle';
  
  return (
    <div className="flex items-center justify-center">
      {showIcon && (
        <motion.div
          animate={flameAnimation}
          variants={flameVariants}
          className="mr-2"
        >
          <Flame className="h-6 w-6 text-white" />
        </motion.div>
      )}
      
      <motion.div
        animate={numberAnimation}
        variants={numberVariants}
        className="flex justify-center w-5"
      >
        {value}
      </motion.div>
    </div>
  );
};