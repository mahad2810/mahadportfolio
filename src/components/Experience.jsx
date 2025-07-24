import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, Code, Brain, GraduationCap } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import { experiences } from '../constants';



const ExperienceCard = ({ experience, index }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        padding: '2rem',
      }}
      contentArrowStyle={{
        borderRight: '7px solid rgba(255, 255, 255, 0.1)'
      }}
      date={experience.date}
      dateClassName="text-gray-600 dark:text-gray-300 font-medium"
      iconStyle={{
        background: experience.iconBg,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        border: '3px solid rgba(255, 255, 255, 0.2)',
      }}
      icon={
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <h3 className='text-gray-800 dark:text-white text-2xl font-bold mb-2'>
            {experience.title}
          </h3>
          <p className='text-accent-purple text-lg font-semibold'>
            {experience.company_name}
          </p>
        </div>

        <ul className='space-y-3'>
          {experience.points.map((point, pointIndex) => (
            <motion.li
              key={`experience-point-${pointIndex}`}
              className='text-gray-600 dark:text-gray-300 text-base leading-relaxed flex items-start'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: pointIndex * 0.1 }}
            >
              <span className="text-accent-purple mr-3 mt-1 flex-shrink-0">•</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 rounded-3xl" />

      <div className="relative z-10">
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            What I have done so far
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Work Experience
          </h2>
        </motion.div>

        <div className='mt-20 flex flex-col'>
          <VerticalTimeline
            lineColor="rgba(139, 92, 246, 0.2)"
          >
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                index={index}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");