import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { GlassCard } from "./ui";

const Tech = () => {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 rounded-3xl" />

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

            {/* Improved grid layout with better spacing and alignment */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 lg:gap-8 place-items-center max-w-6xl mx-auto">
              {technologies.map((technology, index) => (
                <motion.div
                  key={technology.name}
                  className="w-20 h-20 lg:w-24 lg:h-24 group"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <BallCanvas icon={technology.icon} />

                  {/* Technology name tooltip */}
                  <div className="text-center mt-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
