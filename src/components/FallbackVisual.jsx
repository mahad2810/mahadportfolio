import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Code, Palette, Zap } from 'lucide-react';

const FallbackVisual = () => {
  const icons = [
    { Icon: Monitor, delay: 0 },
    { Icon: Code, delay: 0.2 },
    { Icon: Palette, delay: 0.4 },
    { Icon: Zap, delay: 0.6 },
  ];

  return (
    <div className="flex items-center justify-center h-full min-h-[400px] relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-blue/10 rounded-2xl" />
      
      {/* Main visual */}
      <div className="relative z-10 text-center">
        {/* Animated laptop/monitor icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 dark:border-white/10">
            <Monitor size={64} className="text-accent-purple" />
          </div>
        </motion.div>

        {/* Floating skill icons */}
        <div className="relative w-64 h-32 mx-auto">
          {icons.map(({ Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 0.8, 
                delay,
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className={`absolute w-12 h-12 bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl flex items-center justify-center ${
                index === 0 ? 'top-0 left-0' :
                index === 1 ? 'top-0 right-0' :
                index === 2 ? 'bottom-0 left-0' :
                'bottom-0 right-0'
              }`}
            >
              <Icon size={24} className="text-accent-purple" />
            </motion.div>
          ))}
        </div>

        {/* Animated text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Full Stack Developer
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Building amazing digital experiences
          </p>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-2 mt-6"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-accent-purple rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FallbackVisual;
