import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn } from '../utils/motion';
import { GlassCard } from './ui';
import { styles } from '../styles';

const educationData = [
  {
    institution: "Heritage Institute of Technology",
    degree: "B.Tech in Computer Science & Engineering (AI & ML)",
    duration: "2023 - 2027",
    location: "Kolkata, India",
    grade: "YGPA: 9.13 (1st Year), YGPA: 9.61 (2nd Year)",
    achievements: [
      "Consistently maintained excellent academic performance with YGPA above 9.0",
      "Strong foundation in AI/ML specialization subjects",
      "Active participation in technical projects and internships",
      "Developed multiple AI-powered applications during coursework"
    ],
    courses: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Artificial Intelligence",
      "Database Management Systems",
      "Web Development",
      "Software Engineering"
    ]
  },
  {
    institution: "Seventh Day Adventist Senior Secondary School",
    degree: "Indian School Certificate (ISC) - Class XII",
    duration: "2021 - 2023",
    location: "Kolkata, India",
    grade: "Overall: 94.25%",
    achievements: [
      "Outstanding academic performance across all subjects",
      "Consistent high scores in Mathematics and Computer Science",
      "Active participation in school technical events",
      "Leadership roles in academic projects"
    ],
    courses: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science",
      "English"
    ]
  },
  {
    institution: "Seventh Day Adventist Senior Secondary School",
    degree: "Indian Certificate of Secondary Education (ICSE) - Class X",
    duration: "2019 - 2021",
    location: "Kolkata, India",
    grade: "Overall: 91.9%",
    achievements: [
      "Outstanding performance across all subjects",
      "Excellent performance in core subjects",
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
    <div className="relative min-h-[50vh] py-20 bg-gray-900/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/30 via-transparent to-accent-purple/30 rounded-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Academic Background
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Education
          </h2>
        </motion.div>

        {/* Education Cards */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-0">
          {educationData.map((edu, index) => (
            <motion.div
              key={`${edu.institution}-${edu.degree}-${index}`}
              variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            >
              <GlassCard
                variant="default"
                className="p-3 sm:p-4 md:p-6 lg:p-8 hover:scale-[1.01] sm:hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  {/* Left side - Main info */}
                  <div className="lg:col-span-2 space-y-2 sm:space-y-3 lg:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <div className="p-1.5 sm:p-2 lg:p-3 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-full flex-shrink-0">
                        <GraduationCap size={16} className="text-accent-purple sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-accent-purple font-semibold mb-2 leading-tight">
                          {edu.institution}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2 lg:gap-4 text-xs sm:text-sm lg:text-base text-white/80 mb-2 sm:mb-3 lg:mb-4">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Calendar size={14} className="sm:w-4 sm:h-4" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <MapPin size={14} className="sm:w-4 sm:h-4" />
                            <span className="truncate">{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Award size={14} className="sm:w-4 sm:h-4" />
                            <span className="font-semibold text-accent-blue text-xs sm:text-sm">{edu.grade}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 sm:mb-3">
                        Key Achievements
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="text-white/80 flex items-start text-xs sm:text-sm lg:text-base"
                          >
                            <span className="text-accent-purple mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right side - Courses */}
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4 mt-3 lg:mt-0">
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                      Key Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {edu.courses.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="px-2 sm:px-3 py-1 glass backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-sm text-white/90 hover:border-accent-purple/50 transition-colors duration-300 leading-tight"
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
          className="mt-6 sm:mt-8 lg:mt-12 px-2 sm:px-4 lg:px-0"
        >
          <GlassCard variant="primary" className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
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
