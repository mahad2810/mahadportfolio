import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { GlassButton } from "./ui";
import ErrorBoundary from "./ErrorBoundary";
// Resume now served from public folder directly

const Hero = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Mahad(Resume).pdf'; // served from public/
    link.download = 'Mahad_Iqbal_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = () => {
    // For single page app navigation
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If contact section not found, trigger navigation to contact
      window.dispatchEvent(new CustomEvent('navigateToSection', { detail: 'contact' }));
    }
  };

  return (
    <section className={`relative w-full min-h-screen mx-auto overflow-hidden`}>
      {/* Background with glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-blue/10" />

      {/* Main content */}
      <div className={`relative z-10 min-h-screen flex items-center ${styles.paddingX} max-w-7xl mx-auto py-20 sm:py-16 lg:py-0`}>
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 sm:gap-8 lg:gap-12">

          {/* Left side - Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left w-full"
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
              className={`${styles.heroHeadText} text-gray-800 dark:text-white mb-2 sm:mb-3`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className='text-accent-purple'>Mahad Iqbal</span>
            </motion.h1>

            {/* Subtitle / Professional Headline */}
            <motion.p
              className={`${styles.heroSubText} text-gray-800 dark:text-gray-100 mb-4 sm:mb-5 font-semibold tracking-wide bg-gradient-to-r from-accent-purple via-accent-blue to-pink-500 bg-clip-text text-transparent`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Generative AI Developer & Full-Stack Engineer
            </motion.p>

            {/* Description */}
            <motion.div
              className="space-y-4 mb-6 sm:mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Generative AI developer and full-stack engineer with a proven record of delivering production-ready AI applications, from real-time dashboards to smart healthcare platforms. An experienced team lead adept at <span className='font-semibold text-accent-purple/90'>architecting</span> and <span className='font-semibold text-accent-blue/90'>deploying</span> full-stack MVPs in competitive environments, recognized with multiple <span className='font-semibold text-pink-500/80'>first-place hackathon victories</span> and national-level finalist selections.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  'GenAI',
                  'Data Scientist',
                  '4× Hackathon Winner',
                  'AI Engineer'
                ].map((badge, i) => (
                  <span
                    key={badge}
                    className="relative px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
                    style={{ animationDelay: `${0.05 * i}s` }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 via-transparent to-accent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-purple via-accent-blue to-pink-500">
                      {badge}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GlassButton
                variant="primary"
                size="lg"
                onClick={handleDownloadResume}
                icon={<Download size={18} />}
                className="w-full sm:min-w-[180px] lg:min-w-[200px]"
              >
                Download Resume
              </GlassButton>

              <GlassButton
                variant="secondary"
                size="lg"
                onClick={handleContactClick}
                icon={<Mail size={18} />}
                className="w-full sm:min-w-[180px] lg:min-w-[200px]"
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
            className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[400px] relative"
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
