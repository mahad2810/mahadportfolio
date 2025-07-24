import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Eye, Code, X, Play, Image as ImageIcon } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { GlassCard, GlassButton } from "./ui";

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard variant="default" className="p-0">
            {/* Header */}
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {project.name}
              </h2>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={`modal-${project.name}-${tag.name}`}
                    className="px-3 py-1 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 rounded-full text-sm font-medium text-accent-purple"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Full Description */}
              <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                {project.fullDescription ? (
                  <div className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.fullDescription}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.source_code_link && project.source_code_link !== "#" && (
                  <GlassButton
                    variant="primary"
                    onClick={() => window.open(project.source_code_link, "_blank")}
                    className="flex items-center gap-2"
                  >
                    <Github size={16} />
                    Source Code
                  </GlassButton>
                )}

                {project.live_demo_link && project.live_demo_link !== "#" && (
                  <GlassButton
                    variant="secondary"
                    onClick={() => window.open(project.live_demo_link, "_blank")}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </GlassButton>
                )}

                {project.demo_video && project.demo_video !== "#" && (
                  <GlassButton
                    variant="accent"
                    onClick={() => window.open(project.demo_video, "_blank")}
                    className="flex items-center gap-2"
                  >
                    <Play size={16} />
                    Demo Video
                  </GlassButton>
                )}

                {project.snapshots && project.snapshots !== "#" && (
                  <GlassButton
                    variant="ghost"
                    onClick={() => window.open(project.snapshots, "_blank")}
                    className="flex items-center gap-2"
                  >
                    <ImageIcon size={16} />
                    Snapshots
                  </GlassButton>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({
  index,
  project,
  onViewDetails,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, description, tags, image, source_code_link, live_demo_link } = project;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full sm:w-[400px]"
    >
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        scale={1.02}
        transitionSpeed={450}
      >
        <GlassCard
          variant="default"
          className="p-0 overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Project Image */}
          <div className='relative w-full h-[250px] overflow-hidden'>
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />

            {/* Overlay with buttons */}
            <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } flex items-center justify-center gap-4`}>

              {/* GitHub Link */}
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => window.open(source_code_link, "_blank")}
                icon={<Github size={16} />}
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
              >
                Code
              </GlassButton>

              {/* Live Demo Link */}
              {live_demo_link && (
                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(live_demo_link, "_blank")}
                  icon={<ExternalLink size={16} />}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200"
                >
                  Demo
                </GlassButton>
              )}
            </div>

            {/* Project status badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                Featured
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className='p-6 space-y-4'>
            <div>
              <h3 className='text-gray-800 dark:text-white font-bold text-xl mb-2 group-hover:text-accent-purple transition-colors duration-300'>
                {name}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed'>
                {description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className="px-3 py-1 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 border border-accent-purple/20 rounded-full text-xs font-medium text-accent-purple hover:from-accent-purple/20 hover:to-accent-blue/20 transition-all duration-300"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => onViewDetails(project)}
                icon={<Eye size={16} />}
                className="flex-1"
              >
                View Details
              </GlassButton>

              {source_code_link && source_code_link !== "#" && (
                <GlassButton
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(source_code_link, "_blank")}
                  icon={<Code size={16} />}
                  className="flex-1"
                >
                  Code
                </GlassButton>
              )}

              {live_demo_link && live_demo_link !== "#" && (
                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(live_demo_link, "_blank")}
                  icon={<ExternalLink size={16} />}
                  className="flex-1"
                >
                  Demo
                </GlassButton>
              )}
            </div>
          </div>
        </GlassCard>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['all', 'web', 'mobile', 'ai', 'fullstack', 'data'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project =>
        project.category?.toLowerCase() === filter ||
        project.tags.some(tag => tag.name.toLowerCase().includes(filter))
      );

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 via-transparent to-accent-cyan/5 rounded-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            My Portfolio
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Featured Projects
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeIn("up", "spring", 0.1, 1)}
          className="text-center mb-12"
        >
          <p className='text-gray-600 dark:text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed'>
            Explore my portfolio of innovative projects that showcase my expertise in modern web development,
            AI integration, and user experience design. Each project represents a unique challenge solved
            with cutting-edge technologies and creative problem-solving.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <GlassButton
              key={category}
              variant={filter === category ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category === 'ai' ? 'AI/ML' : category}
            </GlassButton>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center'>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              project={project}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for this category.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 1)}
          className="text-center mt-16"
        >
          <GlassCard variant="primary" className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-gray-200 mb-6">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <GlassButton
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </GlassButton>
          </GlassCard>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SectionWrapper(Works, "work");
