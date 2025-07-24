import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';

const GlassInput = forwardRef(({ 
  label,
  error,
  className = '', 
  type = 'text',
  multiline = false,
  rows = 4,
  icon,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <motion.label
          className={`
            absolute
            left-4
            transition-all
            duration-300
            pointer-events-none
            z-10
            ${isFocused || props.value ? 
              'top-2 text-xs text-accent-purple' : 
              'top-4 text-base text-gray-400 dark:text-gray-500'
            }
          `}
          animate={{
            y: isFocused || props.value ? -8 : 0,
            scale: isFocused || props.value ? 0.85 : 1,
          }}
        >
          {label}
        </motion.label>
      )}

      {/* Icon */}
      {icon && (
        <div className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 z-10">
          {icon}
        </div>
      )}

      {/* Input/Textarea */}
      <InputComponent
        ref={ref}
        type={type}
        rows={multiline ? rows : undefined}
        className={`
          w-full
          ${multiline ? 'min-h-[120px] resize-none' : 'h-14'}
          ${icon ? 'pl-12' : 'pl-4'}
          pr-4
          ${label ? 'pt-6 pb-2' : 'py-4'}
          bg-glass-light dark:bg-glass-dark
          backdrop-blur-md
          border border-white/20 dark:border-white/10
          rounded-xl
          text-gray-800 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          transition-all
          duration-300
          ease-out
          focus:outline-none
          focus:border-accent-purple/50
          focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]
          hover:border-white/30 dark:hover:border-white/20
          ${error ? 'border-red-400 focus:border-red-400' : ''}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl pointer-events-none" />

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

GlassInput.displayName = 'GlassInput';

export default GlassInput;
