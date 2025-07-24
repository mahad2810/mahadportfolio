import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../providers/ThemeProvider';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative
        w-14 h-8
        bg-glass-light dark:bg-glass-dark
        backdrop-blur-md
        border border-white/20 dark:border-white/10
        rounded-full
        p-1
        transition-all
        duration-300
        ease-out
        hover:border-white/30 dark:hover:border-white/20
        hover:shadow-glass-light
        group
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Toggle indicator */}
      <motion.div
        className={`
          relative
          w-6 h-6
          bg-white dark:bg-gray-800
          rounded-full
          shadow-lg
          flex
          items-center
          justify-center
          z-10
        `}
        animate={{
          x: isDark ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun size={14} className="text-yellow-500" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon size={14} className="text-blue-400" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
