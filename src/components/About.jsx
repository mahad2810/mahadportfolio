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
      title: "Generative AI",
      description: "Building and deploying generative AI solutions, chatbots, and intelligent interfaces"
    },
    {
      icon: <Palette size={24} />,
      title: "Full-Stack Development",
      description: "Creating production-ready applications with Next.js, React, Flask, and MongoDB"
    },
    {
      icon: <Zap size={24} />,
      title: "Team Leadership",
      description: "Leading cross-functional teams to deliver MVPs in competitive hackathon environments"
    },
    {
      icon: <Users size={24} />,
      title: "AI Applications",
      description: "Developing innovative solutions for healthcare, environmental monitoring, and travel safety"
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
            Professional Background
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            About Me
          </h2>
        </motion.div>

        <div className="space-y-16">
          {/* Highlights Grid - Mobile Optimized */}
          <motion.div
            variants={fadeIn("up", "spring", 0.1, 1)}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                variants={fadeIn("up", "spring", 0.1 * index, 0.75)}
              >
                <GlassCard
                  variant="default"
                  className="p-3 sm:p-6 text-center group hover:scale-105 transition-transform duration-300 h-full"
                >
                  <div className="text-accent-purple mb-2 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center">
                      {React.cloneElement(highlight.icon, { size: window.innerWidth < 640 ? 20 : 24 })}
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2 leading-tight">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-snug">
                    {highlight.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Main About Content - Center Aligned */}
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="max-w-4xl mx-auto"
          >
            <GlassCard variant="minimal" className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                About Me
              </h3>

              <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
                <p className="text-base text-center">
                  I'm <span className="text-accent-purple font-semibold">Mahad Iqbal</span>, a Generative AI Developer and Full-Stack Engineer with a Bachelor of Technology in CSE-AIML from Heritage Institute of Technology, Kolkata. I graduated with excellence from Seventh Day Adventist Senior Secondary School, achieving 94% in both my Class X (ICSE) and Class XII (ISC) examinations.
                </p>

                <div>
                  <p className="text-base mb-3 text-center">
                    With professional experience as a Generative AI Developer Intern at AI Wallah and a Data Science Intern at Pinnacle Labs, I've developed innovative solutions including:
                  </p>
                  
                  <div className="bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 rounded-lg p-4 space-y-2 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                      <span className="text-accent-blue text-lg">•</span>
                      <p><span className="text-accent-blue font-semibold">MaveriqAir</span> – a real-time environmental dashboard with AQI-based health insights, animated weather effects, and an AI chatbot powered by Google Gemini and AirVisual API.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent-purple text-lg">•</span>
                      <p><span className="text-accent-purple font-semibold">AuraMed</span> – a Smart Healthcare Platform with geolocation-based SOS alerts, symptom prediction, and real-time resource tracking, built using React, Flask, Firebase, and ML models.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent-blue text-lg">•</span>
                      <p><span className="text-accent-blue font-semibold">Setuka</span> – an AI+IoT ecosystem providing real-time safety for travelers with wearable telemetry for live vitals and location tracking, implemented with React and Node.js.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">I specialize in:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                        <span className="font-medium">Programming</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Python, C++, SQL</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                        <span className="font-medium">Data & ML Libraries</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Pandas, NumPy, Matplotlib, Seaborn, Scikit-Learn, TensorFlow, PyTorch</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                        <span className="font-medium">ML & AI Expertise</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Supervised/Unsupervised Learning, Deep Learning, Computer Vision, Feature Engineering</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                        <span className="font-medium">Web Development</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Next.js, FastAPI, Django, Flask, SQL, MongoDB</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                        <span className="font-medium">Generative AI</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">LangChain, OpenCV, LLM Integration, Agentic Engineering</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                        <span className="font-medium">Soft Skills</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Team Management, Strategic Planning, Problem-Solving, Communication</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-accent-purple/30 pl-4 bg-accent-purple/5 rounded-r-lg py-3 max-w-3xl mx-auto">
                  <p className="text-base">
                    With a proven track record of <span className="text-accent-purple font-semibold">hackathon victories</span> including 1st Place at IEM Smart Make-A-Thon, 1st Place at Hack Heritage 3.0, and multiple finalist selections at national-level competitions, I combine <span className="text-accent-blue font-semibold">technical expertise</span> with leadership skills to create innovative solutions that address real-world challenges in healthcare, travel safety, and environmental monitoring.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
