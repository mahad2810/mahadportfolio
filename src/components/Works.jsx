import React, { useState } from "react";
import { createPortal } from "react-dom";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Eye, Code, X, FileText } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { GlassCard, GlassButton } from "./ui";
import PDFViewer from "./PDFViewer";

// Enhanced Project Modal with PDF Integration
const ProjectModal = ({ project, isOpen, onClose }) => {
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handlePDFView = () => {
    setShowPDFViewer(true);
  };

  const closePDFViewer = () => {
    setShowPDFViewer(false);
  };

  if (!isOpen) return null;

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        style={{ zIndex: 99999 }}
        onClick={onClose}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col h-full overflow-hidden">
              {/* PDF Preview Section - Top (60% height) */}
              {project.pdf_file && (
                <div className="h-[60%] border-b border-gray-200 dark:border-gray-700">
                  <div className="h-full flex flex-col">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          PDF Preview
                        </h3>
                        <GlassButton
                          variant="accent"
                          size="sm"
                          onClick={handlePDFView}
                          className="flex items-center gap-2"
                        >
                          <FileText size={16} />
                          View Full PDF
                        </GlassButton>
                      </div>
                    </div>
                    <div className="flex-1 p-2 bg-gray-100 dark:bg-gray-900">
                      <iframe
                        src={`${project.pdf_file}#toolbar=0&navpanes=0&scrollbar=1&page=1&zoom=90`}
                        className="w-full h-full border-0 rounded-lg shadow-lg"
                        title={`${project.name} PDF Preview`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Project Info Section - Bottom (40% height) */}
              <div className={`${project.pdf_file ? 'h-[40%]' : 'h-full'} overflow-y-auto`}>
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
                        className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="mb-8">
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
                        <Code size={16} />
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
                  </div>
                </div>
              </div>
            </div>

            {/* Full PDF Viewer */}
            {showPDFViewer && (
              <PDFViewer
                pdfFile={project.pdf_file}
                projectName={project.name}
                isOpen={showPDFViewer}
                onClose={closePDFViewer}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
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
          {/* Project Image or PDF Preview */}
          <div className='relative w-full h-[250px] overflow-hidden'>
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


  const categories = [];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project =>
        project.category?.toLowerCase() === filter ||
        project.tags.some(tag => tag.name.toLowerCase().includes(filter))
      );

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };






  return (
    <div className="relative bg-glass-dark backdrop-blur-md border border-white/10 rounded-3xl p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-transparent to-accent-cyan/10 rounded-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Project Portfolio
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Projects & Applications
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeIn("up", "spring", 0.1, 1)}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed'>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 place-items-center px-4 sm:px-0'>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              project={project}
              onViewDetails={handleProjectClick}
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
          className="text-center mt-12 sm:mt-16 px-4"
        >
          <GlassCard variant="primary" className="p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-gray-200 mb-6 text-sm sm:text-base">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <GlassButton
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto"
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
        onClose={closeModal}
      />


    </div>
  );
};

export default SectionWrapper(Works, "work");
