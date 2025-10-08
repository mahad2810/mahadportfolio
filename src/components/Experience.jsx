import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { experiences } from '../constants';
import { GlassCard } from './ui';
// Removed old card / modal components; simplified to a single showcase section

const Experience = () => {

  return (
    <div className="relative min-h-screen py-20 bg-gray-900/20">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 via-transparent to-accent-blue/20 rounded-3xl" />

      <div className="relative z-10">
        {/* Timeline Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Professional Journey
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Work Experience
          </h2>
        </motion.div>

        {/* Experience Showcase (replaces 3D timeline) */}
        <motion.div
          variants={fadeIn("up", "spring", 0.15, 0.85)}
          className="relative mb-24 max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-purple/15 via-accent-blue/10 to-pink-500/10 blur-xl" />
          <GlassCard className="relative p-6 sm:p-10 overflow-hidden rounded-3xl border border-white/20 dark:border-white/10">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-radial from-accent-purple/30 via-accent-blue/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Logo / Badge */}
              <div className="relative w-32 h-32 flex-shrink-0 mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 p-3 flex items-center justify-center">
                    <img
                      src={experiences[0].icon}
                      alt={experiences[0].company_name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 blur-xl opacity-70 animate-pulse" />
              </div>

              {/* Textual Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-accent-purple via-accent-blue to-pink-500 bg-clip-text text-transparent">
                    {experiences[0].title}
                  </h3>
                  <p className="text-lg sm:text-xl font-semibold text-accent-purple dark:text-accent-blue mt-1">
                    {experiences[0].company_name}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-2">
                    <Calendar size={14} /> {experiences[0].date}
                  </p>
                  {experiences[0].headline && (
                    <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {experiences[0].headline}
                    </p>
                  )}
                </div>

                {/* Key Points */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {experiences[0].points.map(point => (
                    <div
                      key={point}
                      className="group relative p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md hover:border-accent-purple/50 transition-all"
                    >
                      <div className="absolute -left-2 -top-2 w-6 h-6 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white text-xs shadow-md">AI</div>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Metrics / Badges */}
                <div className="flex flex-wrap gap-3">
                  {[
                    'LLM Fine-Tuning',
                    'RAG Pipelines',
                    'Eval Harness',
                    'MLOps',
                    'GPU Optimization'
                  ].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent-purple/20 via-accent-blue/20 to-pink-500/20 border border-white/30 dark:border-white/10 backdrop-blur">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-purple via-accent-blue to-pink-500">{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Removed legacy card grid & modal; showcase above is the final presentation */}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
