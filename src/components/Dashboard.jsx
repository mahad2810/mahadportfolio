import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Eye, Code, ExternalLink, FileText } from "lucide-react";
import { styles } from "../styles";
import { technologies, projects, experiences } from "../constants";
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
          {/* Project Image or PDF Preview */}
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

                  {project.pdf_file && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(project);
                      }}
                      className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                      title="View Full PDF"
                    >
                      <FileText size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Project status badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                {project.pdf_file ? 'PDF Project' : 'Featured'}
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
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => onViewDetails(project)}
                icon={<Eye size={14} />}
                className="flex-1 text-xs"
              >
                View Details
              </GlassButton>

              {source_code_link && source_code_link !== "#" && (
                <GlassButton
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(source_code_link, "_blank")}
                  icon={<Code size={14} />}
                  className="flex-1 text-xs"
                >
                  Code
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
  const currentJob = experiences[0];

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

          {/* Modern Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">

            {/* Current Position - Large Card */}
            <motion.div
              variants={fadeIn("up", "spring", 0.1, 1)}
              className="lg:col-span-8"
            >
              <GlassCard className="p-4 sm:p-6 lg:p-8 h-full bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-blue/10">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 h-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-accent-purple/20">
                    <img
                      src={currentJob.icon}
                      alt={currentJob.company_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <div className="inline-block px-3 py-1 bg-accent-purple/20 rounded-full text-xs font-medium text-accent-purple mb-3">
                      Current Position
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                      {currentJob.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-1">
                      {currentJob.company_name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentJob.date}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Stats - Vertical Cards */}
            <motion.div
              variants={fadeIn("up", "spring", 0.2, 1)}
              className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4"
            >
              <GlassCard className="p-4 sm:p-6 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                <h4 className="text-xl sm:text-2xl font-bold text-green-500 mb-1">
                  {projects.length}+
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Projects</p>
              </GlassCard>
              <GlassCard className="p-4 sm:p-6 text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                <h4 className="text-xl sm:text-2xl font-bold text-blue-500 mb-1">
                  {technologies.length}+
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Technologies</p>
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
                  {experiences.length}+
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Experiences</p>
              </GlassCard>
              <GlassCard className="p-6 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <h4 className="text-2xl font-bold text-orange-500 mb-1">
                  2+
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
