import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { GlassCard } from "./ui";

const Tech = () => {
  return (
    <div className="relative min-h-screen py-20 bg-gray-900/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-transparent to-accent-purple/20 rounded-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Technical Expertise
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Technologies & Tools
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            A comprehensive overview of the technologies, frameworks, and tools I use to build
            innovative solutions across different domains.
          </p>
        </motion.div>

        {/* 3D Tech Showcase */}
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="mt-8"
        >
          <GlassCard variant="minimal" className="p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-12">

            </h3>

            {/* Mobile: 4 columns, Tablet: 6 columns, Desktop: 8 columns */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3 sm:gap-6 lg:gap-8 place-items-center max-w-6xl mx-auto">
              {technologies.map((technology, index) => (
                <motion.div
                  key={technology.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 group"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <BallCanvas icon={technology.icon} />

                  {/* Technology name tooltip - Hidden on mobile for cleaner look */}
                  <div className="text-center mt-1 sm:mt-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                      {technology.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech count indicator */}
            <motion.div
              className="text-center mt-12"
              variants={fadeIn("up", "spring", 0.5, 1)}
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {technologies.length} Technologies & Tools
              </p>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
