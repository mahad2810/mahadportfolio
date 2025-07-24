import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true, 
  delay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`
        backdrop-blur-md bg-white/10 dark:bg-white/5
        border border-white/20 dark:border-white/10
        rounded-2xl shadow-glass
        relative overflow-hidden
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-white/20 before:to-transparent
        before:opacity-50 before:pointer-events-none
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;