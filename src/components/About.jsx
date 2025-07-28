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
      description: "ML model development, deployment, and optimization for real-world applications"
    },
    {
      icon: <Palette size={24} />,
      title: "Data Science",
      description: "Complex dataset analysis, visualization, and extracting actionable insights"
    },
    {
      icon: <Zap size={24} />,
      title: "NLP & Generative AI",
      description: "Building intelligent language models, chatbots, and AI applications"
    },
    {
      icon: <Users size={24} />,
      title: "Healthcare Innovation",
      description: "Developing AI-powered solutions for healthcare challenges and patient care"
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
                  I'm <span className="text-accent-purple font-semibold">Mahad Iqbal</span>, an aspiring AI/ML Engineer and Data Scientist with a strong foundation in machine learning, data analysis, and full-stack development. My passion lies in turning complex datasets into actionable insights and building intelligent systems that solve real-world problems.
                </p>

                <div>
                  <p className="text-base mb-3 text-center">
                    With hands-on experience in deploying ML models, working with satellite and sensor data, and building end-to-end applications, I've developed impactful projects like:
                  </p>
                  
                  <div className="bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 rounded-lg p-4 space-y-2 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                      <span className="text-accent-blue text-lg">•</span>
                      <p><span className="text-accent-blue font-semibold">AuraMed</span> – an AI-powered healthcare platform for symptom prediction and emergency alerts.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent-purple text-lg">•</span>
                      <p><span className="text-accent-purple font-semibold">MaveriqAir</span> – a real-time AQI and flood forecasting system using CPCB and Sentinel-5P data.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">I specialize in:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                        <span className="font-medium">Machine Learning & NLP</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Scikit-learn, Transformers, Prompt Engineering</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                        <span className="font-medium">Data Analysis & Visualization</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Pandas, NumPy, Power BI, Seaborn</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
                        <span className="font-medium">Model Deployment</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Flask, Docker, GCP</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                        <span className="font-medium">Cloud & APIs</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">Firebase, REST, AirVisual, Gemini</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-accent-purple/30 pl-4 bg-accent-purple/5 rounded-r-lg py-3 max-w-3xl mx-auto">
                  <p className="text-base">
                    Currently deepening my skills in <span className="text-accent-purple font-semibold">Generative AI</span> and <span className="text-accent-blue font-semibold">LLM applications</span>, I'm seeking opportunities where I can contribute to impactful AI products and continue growing as a data-driven problem solver.
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
