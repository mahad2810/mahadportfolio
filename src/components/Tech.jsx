import React from "react";
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
            My Technical Arsenal
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Skills & Technologies
          </h2>
        </motion.div>

        {/* 3D Tech Showcase */}
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="mt-8"
        >
          <GlassCard variant="minimal" className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
              Interactive 3D Tech Stack
            </h3>
            <div className='flex flex-row flex-wrap justify-center gap-6'>
              {technologies.map((technology) => (
                <div className='w-20 h-20' key={technology.name}>
                  <BallCanvas icon={technology.icon} />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
