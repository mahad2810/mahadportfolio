import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { GlassCard } from './ui';

const educationData = [
  {
    institution: "Heritage Institute of Technology",
    degree: "B.Tech in Computer Science & Engineering (AI & ML)",
    duration: "2023 - 2027",
    location: "Kolkata, India",
    grade: "SGPA: 9.52 (2nd Semester), SGPA: 9.7 (EVEN 4th Semester)",
    achievements: [
      "Consistently maintained excellent academic performance with SGPA above 9.5",
      "Strong foundation in AI/ML specialization subjects",
      "Active participation in technical projects and internships",
      "Developed multiple AI-powered applications during coursework"
    ],
    courses: [
      "Environmental Sciences",
      "Digital Circuit Design",
      "Introduction to Smart Sensing Technology",
      "Design & Analysis of Algorithms",
      "Computer Organization and Architecture",
      "Introduction to Artificial Intelligence",
      "Design & Analysis of Algorithms Lab",
      "Computer Architecture Lab",
      "AI Lab",
      "Digital Circuit Design Lab"
    ]
  },
  {
    institution: "Seventh Day Adventist Senior Secondary School",
    degree: "Indian School Certificate (ISC) - Class XII",
    duration: "2021 - 2023",
    location: "Kolkata, India",
    grade: "Overall: 91.9% | English: 91% | Mathematics: 81% | Physics: 93% | Chemistry: 93% | Computer Science: 97%",
    achievements: [
      "Exceptional performance in Computer Science with 97%",
      "Strong performance in Science subjects (Physics: 93%, Chemistry: 93%)",
      "Consistent academic excellence across all subjects",
      "Grade A in Internal Assessment and Community Service"
    ],
    courses: [
      "English Language & Literature",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science"
    ]
  },
  {
    institution: "Seventh Day Adventist Senior Secondary School",
    degree: "Indian Certificate of Secondary Education (ICSE) - Class X",
    duration: "2019 - 2021",
    location: "Kolkata, India",
    grade: "Overall: 91.9% | English: 92% | Hindi: 99% | History/Civics/Geography: 92% | Mathematics: 84% | Science: 92% | Economics: 96%",
    achievements: [
      "Outstanding performance in Hindi with 99%",
      "Excellent performance in Economics with 96%",
      "Consistent high scores across all subjects",
      "Grade A in Internal Assessment and Community Service"
    ],
    courses: [
      "English Language & Literature",
      "Hindi",
      "History, Civics & Geography",
      "Mathematics",
      "Science (Physics, Chemistry, Biology)",
      "Economic Applications"
    ]
  }
];

const Education = () => {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 rounded-3xl" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            My Academic Journey
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Education
          </h2>
        </motion.div>

        {/* Education Cards */}
        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={`${edu.institution}-${edu.degree}-${index}`}
              variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            >
              <GlassCard 
                variant="default" 
                className="p-8 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left side - Main info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-full">
                        <GraduationCap size={24} className="text-accent-purple" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-xl text-accent-purple font-semibold mb-2">
                          {edu.institution}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award size={16} />
                            <span className="font-semibold text-accent-blue">{edu.grade}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li 
                            key={achIndex}
                            className="text-gray-600 dark:text-gray-300 flex items-start"
                          >
                            <span className="text-accent-purple mr-3 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right side - Courses */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Key Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="px-3 py-1 bg-glass-light dark:bg-glass-dark backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-accent-purple/50 transition-colors duration-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          variants={fadeIn("up", "spring", 0.6, 0.75)}
          className="mt-12"
        >
          <GlassCard variant="primary" className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto">
              Beyond formal education, I'm committed to lifelong learning through online courses, 
              workshops, and hands-on projects. I regularly update my skills with the latest 
              technologies and industry best practices.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Education, "education");
