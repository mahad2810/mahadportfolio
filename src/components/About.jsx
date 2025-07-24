import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Users } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { GlassCard } from "./ui";

const About = () => {
  const highlights = [
    {
      icon: <Code size={24} />,
      title: "Machine Learning",
      description: "Expertise in ML model development and deployment"
    },
    {
      icon: <Palette size={24} />,
      title: "Data Science",
      description: "Analyzing complex datasets to extract meaningful insights"
    },
    {
      icon: <Zap size={24} />,
      title: "NLP & Generative AI",
      description: "Building intelligent language models and AI applications"
    },
    {
      icon: <Users size={24} />,
      title: "Healthcare Innovation",
      description: "Developing AI solutions for real-world healthcare challenges"
    }
  ];

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-blue/5 rounded-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Introduction
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 1)}
            className="space-y-6"
          >
            <GlassCard variant="minimal" className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Aspiring ML Engineer & Healthcare Innovator
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                I'm pursuing B.Tech in CSE (AI & ML) with hands-on experience in <span className="text-accent-purple font-semibold">Machine Learning</span>,
                <span className="text-accent-blue font-semibold"> Deep Learning</span>, and <span className="text-accent-purple font-semibold">NLP</span>.
                Proficient in <span className="text-accent-blue font-semibold">Python</span>,
                <span className="text-accent-purple font-semibold"> TensorFlow</span>, and <span className="text-accent-blue font-semibold">React</span>.
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Currently working on <span className="text-accent-purple font-semibold">AuraMed</span> - revolutionizing hospital operations & patient care.
                Passionate about leveraging AI to solve real-world healthcare challenges and improve patient outcomes.
                Let's collaborate to build intelligent solutions that make a difference!
              </p>
            </GlassCard>
          </motion.div>

          {/* Right side - Highlights grid */}
          <motion.div
            variants={fadeIn("left", "spring", 0.3, 1)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                variants={fadeIn("up", "spring", 0.1 * index, 0.75)}
              >
                <GlassCard
                  variant="default"
                  className="p-6 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-accent-purple mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {highlight.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {highlight.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          variants={fadeIn("up", "spring", 0.5, 1)}
          className="mt-16"
        >
          <GlassCard variant="primary" className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">2+</h4>
                <p className="text-gray-200">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">15+</h4>
                <p className="text-gray-200">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">10+</h4>
                <p className="text-gray-200">Technologies</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">100%</h4>
                <p className="text-gray-200">Client Satisfaction</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
