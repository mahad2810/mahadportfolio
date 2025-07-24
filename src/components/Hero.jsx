import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { GlassButton } from "./ui";
import ErrorBoundary from "./ErrorBoundary";

const Hero = () => {
  const handleDownloadResume = () => {
    // Add your resume download logic here
    console.log("Download resume");
  };

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      {/* Background with glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-blue/10" />

      {/* Main content */}
      <div className={`relative z-10 h-full flex items-center ${styles.paddingX} max-w-7xl mx-auto`}>
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">

          {/* Left side - Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative line */}
            <div className='hidden lg:flex flex-col justify-center items-start mb-8'>
              <div className='w-5 h-5 rounded-full bg-accent-purple animate-pulse' />
              <div className='w-1 h-20 bg-gradient-to-b from-accent-purple to-transparent ml-2' />
            </div>

            {/* Main heading */}
            <motion.h1
              className={`${styles.heroHeadText} text-gray-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm <span className='text-accent-purple'>Mahad Iqbal</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className={`${styles.heroSubText} text-gray-600 dark:text-gray-300 mb-2`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Aspiring Machine Learning Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              B.Tech in CSE (AI & ML) | Passionate About Data Science, NLP, and Real-World ML Applications.
              Building intelligent solutions that make a difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GlassButton
                variant="primary"
                size="lg"
                onClick={handleDownloadResume}
                icon={<Download size={20} />}
                className="min-w-[200px]"
              >
                Download Resume
              </GlassButton>

              <GlassButton
                variant="secondary"
                size="lg"
                onClick={handleContactClick}
                icon={<Mail size={20} />}
                className="min-w-[200px]"
              >
                Get In Touch
              </GlassButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <a
                href="https://www.linkedin.com/in/mahadiqbal16/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full hover:border-accent-blue/50 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-accent-blue transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://github.com/mahad2810/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full hover:border-gray-500 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Model or Visual */}
          <motion.div
            className="flex-1 h-full min-h-[400px] relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ErrorBoundary>
              <ComputersCanvas />
            </ErrorBoundary>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <a href='#about' className="block">
          <div className='w-8 h-14 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center items-start p-2 hover:border-accent-purple transition-colors duration-300'>
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600'
            />
          </div>
        </a>
      </motion.div>

    </section>
  );
};

export default Hero;
