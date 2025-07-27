import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Calendar } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { experiences } from '../constants';
import { GlassCard, GlassButton } from './ui';
import ExperienceTimeline from './ExperienceTimeline';



const ExperienceModal = ({ experience, isOpen, onClose }) => {
  if (!isOpen || !experience) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
        style={{ overflow: 'hidden' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard variant="default" className="p-0">
            {/* Header */}
            <div className="relative p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex items-start gap-4 pr-12">
                <div className="w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0">
                  <img
                    src={experience.icon}
                    alt={experience.company_name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {experience.title}
                  </h2>
                  <p className="text-lg text-accent-purple font-semibold mb-2">
                    {experience.company_name}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar size={16} />
                    <span>{experience.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Key Responsibilities & Achievements</h3>
                <ul className="space-y-2">
                  {experience.points.map((point, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start text-sm">
                      <span className="text-accent-purple mr-3 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ExperienceCard = ({ experience, index, onViewDetails }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full sm:w-[300px]"
    >
      <GlassCard
        variant="default"
        className="p-6 h-full hover:scale-[1.02] transition-transform duration-300 group cursor-pointer"
        onClick={() => onViewDetails(experience)}
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-lg p-2 mx-auto">
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-accent-purple transition-colors">
              {experience.title}
            </h3>
            <p className="text-accent-purple font-semibold">
              {experience.company_name}
            </p>
          </div>

          <GlassButton
            variant="primary"
            size="sm"
            icon={<Eye size={16} />}
            className="w-full"
          >
            View Details
          </GlassButton>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-blue/5 rounded-3xl" />

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

        {/* 3D Timeline Section */}
        <div className="mb-24">
          <ExperienceTimeline />
        </div>

        {/* Traditional Experience Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
           
          </h2>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <ExperienceModal
          experience={selectedExperience}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
