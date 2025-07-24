import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const GlassCard = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  blur = 'md',
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-glass-light dark:bg-glass-dark border border-white/20 dark:border-white/10',
    primary: 'bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30',
    secondary: 'bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 border border-accent-blue/30',
    accent: 'bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 border border-accent-pink/30',
    minimal: 'bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5',
  };

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const baseClasses = `
    ${variants[variant]}
    ${blurClasses[blur]}
    rounded-2xl
    shadow-glass
    relative
    overflow-hidden
    transition-all
    duration-300
    ease-out
  `;

  const hoverClasses = hover ? `
    hover:shadow-glass-light
    hover:border-white/30
    dark:hover:border-white/20
    hover:scale-[1.02]
    hover:-translate-y-1
  ` : '';

  return (
    <motion.div
      ref={ref}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
