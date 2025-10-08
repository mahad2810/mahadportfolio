import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Eye, Code, ExternalLink, FileText, Mail, MessageCircle, Download } from "lucide-react";
import { styles } from "../styles";
import { technologies, projects, experiences } from "../constants";
import { profilePic } from "../assets";
import { GlassCard, GlassButton } from "./ui";
import { fadeIn, textVariant } from "../utils/motion";
import { BallCanvas } from "./canvas";
import Hero from "./Hero";

const DashboardProjectCard = ({ project, index, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, description, tags, image, source_code_link, live_demo_link } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        scale={1.02}
        transitionSpeed={450}
      >
        <GlassCard
          variant="default"
          className="p-0 overflow-hidden h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Project Image, PDF Preview, or Gallery Preview */}
          <div className='relative w-full h-[200px] overflow-hidden'>
            {project.pdf_file ? (
              // PDF Preview
              <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
                <iframe
                  src={`${project.pdf_file}#toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=50`}
                  className="w-full h-full border-0 pointer-events-none"
                  title={`${name} PDF Preview`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  PDF
                </div>
              </div>
            ) : project.type === "gallery" && project.image_gallery && project.image_gallery.length > 0 ? (
              // Gallery Preview
              <div className="relative w-full h-full">
                <img
                  src={project.image_gallery[0]}
                  alt={name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Gallery
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <div className="text-white bg-black/60 px-2 py-1 rounded text-xs font-medium">
                    {project.image_gallery.length} images
                  </div>
                  {project.demo_video && (
                    <div className="text-white bg-red-600/80 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Video
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Regular Image
              <img
                src={image}
                alt={name}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
            )}

            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } flex flex-col items-center justify-center gap-4`}>
              <div className="text-white text-center">
                <h4 className="text-lg font-bold mb-3">Quick Actions</h4>
                <div className="flex gap-3">
                  {source_code_link && source_code_link !== "#" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(source_code_link, "_blank");
                      }}
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="View Source Code"
                    >
                      <Code size={20} />
                    </button>
                  )}

                  {live_demo_link && live_demo_link !== "#" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(live_demo_link, "_blank");
                      }}
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </button>
                  )}

                  {(project.pdf_file || project.type === "gallery") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(project);
                      }}
                      className={`p-3 ${project.type === "gallery" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-purple-600 hover:bg-purple-700"} rounded-full transition-colors`}
                      title={project.type === "gallery" ? "View Gallery" : "View Full PDF"}
                    >
                      {project.type === "gallery" ? <Eye size={20} /> : <FileText size={20} />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Project status badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 glass backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                {project.pdf_file ? 'PDF Project' : project.type === "gallery" ? 'Gallery Project' : 'Featured'}
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className='p-4 space-y-3'>
            <div>
              <h4 className='text-gray-800 dark:text-white font-bold text-lg mb-2 group-hover:text-accent-purple transition-colors duration-300'>
                {name}
              </h4>
              <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2'>
                {description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div className='flex flex-wrap gap-2'>
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className="px-2 py-1 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 border border-accent-purple/20 rounded-full text-xs font-medium text-accent-purple"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {source_code_link && source_code_link !== "#" && (
                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(source_code_link, "_blank")}
                  icon={<Code size={14} />}
                  className="flex-1 text-xs"
                >
                  View Code
                </GlassButton>
              )}

              {live_demo_link && live_demo_link !== "#" && (
                <GlassButton
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(live_demo_link, "_blank")}
                  icon={<ExternalLink size={14} />}
                  className="flex-1 text-xs"
                >
                  Live Demo
                </GlassButton>
              )}
            </div>
          </div>
        </GlassCard>
      </Tilt>
    </motion.div>
  );
};

const Dashboard = () => {
  // Get top 6 technologies for display
  const topTechnologies = technologies.slice(0, 6);
  
  // Get top 3 projects for display
  const topProjects = projects.slice(0, 3);
  
  // Get current job (most recent experience)
    const currentJob = experiences[0]; // Assuming only one experience is relevant

  const handleGetInTouch = () => {
    // Navigate to contact section
    window.dispatchEvent(new CustomEvent('navigateToSection', { detail: 'contact' }));
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Hero />
      </div>

      {/* Dashboard Content */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 sm:py-16 lg:py-20">

          {/* Modern Grid Layout - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
            
            {/* Welcome Card - Full width on mobile */}
            <motion.div
              variants={fadeIn("right", "spring", 0.1, 1)}
              className="sm:col-span-2 lg:col-span-8"
            >
              <GlassCard className="p-4 sm:p-8 h-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent-purple to-accent-blue rounded-full p-1">
                    <img
                      src={profilePic}
                      alt="Mahad Iqbal"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                      Welcome to My Portfolio
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
                      AI/ML Engineer & Data Scientist
                    </p>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  Passionate about transforming data into intelligent solutions. Explore my journey through machine learning, data science, and innovative AI applications.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleGetInTouch}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-accent-purple to-accent-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Get In Touch
                  </button>
                  <button className="flex-1 sm:flex-none border border-accent-purple text-accent-purple px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-accent-purple/10 transition-all duration-300 flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download CV
                  </button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Core Technologies - 2x3 grid on mobile */}
            <motion.div
              variants={fadeIn("left", "spring", 0.3, 1)}
              className="sm:col-span-2 lg:col-span-4"
            >
              <GlassCard className="p-4 sm:p-6 h-full">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-accent-purple to-accent-blue rounded-lg flex items-center justify-center">
                    <Code size={14} className="sm:w-4 sm:h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                    Core Technologies
                  </h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 place-items-center">
                  {topTechnologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 group"
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
                      <BallCanvas icon={tech.icon} />
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Technologies and Projects Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-16">

            {/* Core Technologies - Compact Card */}
            <motion.div
              variants={fadeIn("left", "spring", 0.3, 1)}
              className="xl:col-span-2"
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent-purple to-accent-blue rounded-lg flex items-center justify-center">
                    <Code size={16} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Core Technologies
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 place-items-center">
                  {topTechnologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="w-16 h-16 group"
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
                      <BallCanvas icon={tech.icon} />
                      <div className="text-center mt-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {tech.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Featured Projects - Larger Section */}
            <motion.div
              variants={fadeIn("right", "spring", 0.4, 1)}
              className="xl:col-span-3"
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Eye size={16} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Featured Projects
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
                  {topProjects.slice(0, 2).map((project, index) => (
                    <DashboardProjectCard
                      key={project.name}
                      project={project}
                      index={index}
                      onViewDetails={(project) => {
                        console.log("View project details:", project.name);
                      }}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Bottom Section - Experience Highlights and Additional Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Experience Highlights */}
            <motion.div
              variants={fadeIn("up", "spring", 0.5, 1)}
              className="lg:col-span-2"
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <ExternalLink size={16} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Recent Experience Highlights
                  </h3>
                </div>
                <div className="space-y-4">
                  {experiences.slice(0, 2).map((exp, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={exp.icon}
                          alt={exp.company_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                          {exp.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {exp.company_name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          {exp.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Additional Stats */}
            <motion.div
              variants={fadeIn("up", "spring", 0.6, 1)}
              className="lg:col-span-1 space-y-4"
            >
              <GlassCard className="p-6 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <h4 className="text-2xl font-bold text-purple-500 mb-1">
                    1+
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Experiences</p>
              </GlassCard>
              <GlassCard className="p-6 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <h4 className="text-2xl font-bold text-orange-500 mb-1">
                  1+
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Years Experience</p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;









