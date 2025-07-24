import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const GlassButton = forwardRef(({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  ...props 
}, ref) => {
  const variants = {
    primary: `
      bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 
      border border-accent-purple/40 
      text-white 
      hover:from-accent-purple/30 hover:to-accent-blue/30
      hover:border-accent-purple/60
      shadow-[0_0_20px_rgba(139,92,246,0.3)]
      hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
    `,
    secondary: `
      bg-glass-light dark:bg-glass-dark 
      border border-white/20 dark:border-white/10 
      text-gray-800 dark:text-white 
      hover:bg-white/20 dark:hover:bg-white/10
      hover:border-white/30 dark:hover:border-white/20
    `,
    outline: `
      bg-transparent 
      border-2 border-accent-purple/50 
      text-accent-purple 
      hover:bg-accent-purple/10
      hover:border-accent-purple/70
    `,
    ghost: `
      bg-transparent 
      border border-transparent 
      text-gray-600 dark:text-gray-300 
      hover:bg-white/10 dark:hover:bg-white/5
      hover:border-white/20 dark:hover:border-white/10
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  };

  const baseClasses = `
    ${variants[variant]}
    ${sizes[size]}
    backdrop-blur-md
    font-medium
    transition-all
    duration-300
    ease-out
    relative
    overflow-hidden
    group
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    disabled:hover:shadow-none
    flex
    items-center
    justify-center
    gap-2
  `;

  const hoverClasses = !disabled ? `
    hover:scale-105
    hover:-translate-y-0.5
    active:scale-95
    active:translate-y-0
  ` : '';

  return (
    <motion.button
      ref={ref}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          <span className="w-5 h-5">{icon}</span>
        ) : null}
        {children}
      </div>
    </motion.button>
  );
});

GlassButton.displayName = 'GlassButton';

export default GlassButton;
