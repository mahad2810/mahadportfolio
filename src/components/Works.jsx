import React, { useState } from "react";
import { createPortal } from "react-dom";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Eye, Code, X, FileText } from "lucide-react";

import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { GlassCard, GlassButton } from "./ui";
import PDFViewer from "./PDFViewer";
import { styles } from "../styles";

// Enhanced Project Modal with PDF Integration and Image Gallery
const ProjectModal = ({ project, isOpen, onClose }) => {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Set up fullscreen change listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handlePDFView = () => {
    setShowPDFViewer(true);
  };

  const closePDFViewer = () => {
    setShowPDFViewer(false);
  };

  const nextImage = () => {
    if (project.image_gallery && project.image_gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.image_gallery.length);
    }
  };

  const prevImage = () => {
    if (project.image_gallery && project.image_gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.image_gallery.length - 1 : prev - 1
      );
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-[#050816]/95 to-[#151030]/95 backdrop-blur-md"
        style={{ zIndex: 99999 }}
        onClick={onClose}
      >
        <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl h-[95vh] sm:h-[90vh] bg-gradient-to-br from-[#1d1836] to-[#0b0a17] rounded-lg sm:rounded-2xl shadow-[0_0_40px_rgba(131,58,180,0.15)] overflow-hidden border border-[#6e57e0]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-[#915eff]/30 backdrop-blur-md rounded-full text-white hover:bg-[#915eff]/50 transition-all duration-300 shadow-lg border border-[#915eff]/30"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>

            <div className="flex flex-col h-full overflow-hidden">
              {/* Cover Preview (50% of modal height) */}
              <div className="relative h-[50%] w-full overflow-hidden flex items-center justify-center bg-[#120f25]">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/10 to-[#1d1836]/90"></div>
                <img
                  src={project.coverImage 
                    || (project.type === "gallery" && project.image_gallery && project.image_gallery.length > 0
                      ? `/Main(${project.name.split(' ')[1].replace('–', '').trim()}).png`
                      : project.image)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = project.coverImage
                      || (project.type === "gallery" && project.image_gallery && project.image_gallery.length > 0
                        ? project.image_gallery[0]
                        : project.image);
                  }}
                  alt={project.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_0_25px_rgba(145,94,255,0.25)] transition-transform duration-500"
                />
                
                {/* Project Type Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {project.type === "gallery" && (
                    <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      Gallery Project
                    </span>
                  )}
                  {project.pdf_file && (
                    <span className="bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      PDF Documentation
                    </span>
                  )}
                  {project.demo_video && (
                    <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Video Demo
                    </span>
                  )}
                </div>
                
                {/* Fullscreen Gallery Button */}
                {project.type === "gallery" && project.image_gallery && project.image_gallery.length > 0 && (
                  <button 
                    onClick={() => setShowGalleryModal(true)}
                    className="absolute bottom-4 right-4 bg-[#915eff]/80 hover:bg-[#915eff] text-white px-3.5 py-2 rounded-lg shadow-lg transition-all duration-300 text-sm font-medium flex items-center gap-2"
                    aria-label="Open gallery in fullscreen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    View Gallery ({project.image_gallery.length} Images)
                    {project.demo_video && <span className="ml-1">+ Video</span>}
                  </button>
                )}
                
                {/* PDF View Button */}
                {project.pdf_file && !project.image_gallery && (
                  <button 
                    onClick={handlePDFView}
                    className="absolute bottom-4 right-4 bg-[#915eff]/80 hover:bg-[#915eff] text-white px-3.5 py-2 rounded-lg shadow-lg transition-all duration-300 text-sm font-medium flex items-center gap-2"
                    aria-label="View PDF"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    View PDF Documentation
                  </button>
                )}
              </div>
              
              {/* Content Section (remaining 50%) */}
              <div className="h-[50%] overflow-y-auto p-6 sm:p-8 border-t border-[#281c5e]/40 bg-gradient-to-b from-transparent to-[#0b0a17]">
                {/* Project Title */}
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#aaa6c3] to-white bg-clip-text text-transparent mb-4 sm:mb-5 leading-tight">
                  {project.name}
                </h2>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={`modal-${project.name}-${tag.name}`}
                      className="px-3 py-1 bg-gradient-to-r from-[#915eff]/10 to-[#7562df]/10 border border-[#915eff]/30 rounded-full text-xs sm:text-sm font-medium text-[#c2b9ff] shadow-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#aaa6c3] mb-4 flex items-center gap-2 border-b border-[#281c5e]/30 pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#915eff]">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Project Details
                  </h3>
                  <div className="text-[#aaa6c3] leading-relaxed space-y-3 bg-[#1d1836]/30 p-4 rounded-lg border border-[#281c5e]/50 shadow-inner">
                    {project.fullDescription ? (
                      project.fullDescription.split('\n').map((paragraph, index) => {
                        if (paragraph.trim() === '') return null;
                        
                        // Handle headers (lines starting with **)
                        if (paragraph.includes('**') && paragraph.includes(':**')) {
                          const headerText = paragraph.replace(/\*\*/g, '').replace(':', '');
                          return (
                            <h4 key={index} className="text-base font-semibold text-[#c2b9ff] mt-5 mb-3 bg-gradient-to-r from-[#915eff]/10 to-transparent border-l-4 border-[#915eff] pl-3 py-2 rounded-r-md">
                              {headerText}
                            </h4>
                          );
                        }
                        
                        // Handle bullet points (lines starting with •)
                        if (paragraph.trim().startsWith('•')) {
                          return (
                            <div key={index} className="flex items-start gap-2 ml-4">
                              <span className="text-[#915eff] mt-1 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                              </span>
                              <span>{paragraph.replace(/^•\s*/, '')}</span>
                            </div>
                          );
                        }
                        
                        // Handle bold text within paragraphs
                        if (paragraph.includes('**')) {
                          const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                          return (
                            <p key={index} className="mb-2">
                              {parts.map((part, partIndex) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return (
                                    <strong key={partIndex} className="font-semibold text-[#d8d4ff] bg-gradient-to-r from-[#915eff]/20 to-transparent px-1 rounded">
                                      {part.replace(/\*\*/g, '')}
                                    </strong>
                                  );
                                }
                                return part;
                              })}
                            </p>
                          );
                        }
                        
                        // Regular paragraph
                        return <p key={index} className="mb-2">{paragraph}</p>;
                      })
                    ) : (
                      <p>{project.description}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8 border-t border-[#281c5e]/30 pt-6">
                  {project.source_code_link && project.source_code_link !== "#" && (
                    <GlassButton
                      variant="primary"
                      onClick={() => window.open(project.source_code_link, "_blank")}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#915eff]/20 to-[#7562df]/20 hover:from-[#915eff]/30 hover:to-[#7562df]/30 text-white border border-[#915eff]/30 px-5 py-2.5"
                    >
                      <Code size={16} className="text-[#c2b9ff]" />
                      Source Code
                    </GlassButton>
                  )}

                  {project.live_demo_link && project.live_demo_link !== "#" && (
                    <GlassButton
                      variant="secondary"
                      onClick={() => window.open(project.live_demo_link, "_blank")}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#915eff]/20 to-[#7562df]/20 hover:from-[#915eff]/30 hover:to-[#7562df]/30 text-white border border-[#915eff]/30 px-5 py-2.5"
                    >
                      <ExternalLink size={16} className="text-[#c2b9ff]" />
                      Live Demo
                    </GlassButton>
                  )}

                  <div className="ml-auto flex items-center text-sm text-[#aaa6c3]/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Last Updated: Oct 2025
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
            
            {/* Gallery Modal */}
            {showGalleryModal && project.type === "gallery" && project.image_gallery && project.image_gallery.length > 0 && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowGalleryModal(false)}>
                <div className="w-full max-w-7xl max-h-[90vh] bg-[#1d1836]/90 rounded-lg shadow-2xl overflow-hidden border border-[#915eff]/30" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col h-full">
                    {/* Gallery Header */}
                    <div className="p-4 border-b border-[#281c5e] bg-[#271e41] flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#d8d4ff]">
                        {project.name} - Full Gallery
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#c2b9ff] bg-gradient-to-r from-[#915eff]/20 to-[#7562df]/20 px-3 py-1.5 rounded-full border border-[#915eff]/30 font-medium flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#915eff]">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          {currentImageIndex + 1} / {project.image_gallery.length}
                        </span>
                        <button 
                          onClick={() => setShowGalleryModal(false)} 
                          className="p-2 bg-[#915eff]/30 rounded-full text-white hover:bg-[#915eff]/50"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Gallery Content */}
                    <div className="flex-1 relative p-4 flex flex-col items-center justify-center bg-[#141234]/90">
                      {showVideo && project.demo_video ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="relative shadow-[0_10px_30px_rgba(145,94,255,0.3)] rounded-lg overflow-hidden border border-[#915eff]/30 bg-[#1d1836]/70 max-w-4xl">
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                              <GlassButton
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (document.fullscreenElement) {
                                    document.exitFullscreen();
                                  } else {
                                    const videoElement = document.getElementById('gallery-video');
                                    if (videoElement) videoElement.requestFullscreen();
                                  }
                                }}
                                className="p-2 bg-[#915eff]/20 hover:bg-[#915eff]/30 text-white border border-[#915eff]/30"
                                title="Toggle Fullscreen"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <polyline points="9 21 3 21 3 15"></polyline>
                                  <line x1="21" y1="3" x2="14" y2="10"></line>
                                  <line x1="3" y1="21" x2="10" y2="14"></line>
                                </svg>
                              </GlassButton>
                              <GlassButton
                                variant="outline"
                                size="sm"
                                onClick={() => setShowVideo(false)}
                                className="p-2 bg-[#915eff]/20 hover:bg-[#915eff]/30 text-white border border-[#915eff]/30"
                                title="Close Video"
                              >
                                ✕
                              </GlassButton>
                            </div>
                            <video 
                              id="gallery-video"
                              src={project.demo_video} 
                              className="max-w-full w-full max-h-[70vh] object-contain p-2"
                              controls
                              autoPlay
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Gallery Navigation */}
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                            <button 
                              onClick={prevImage}
                              className="p-3 bg-[#915eff]/20 hover:bg-[#915eff]/40 rounded-full text-white shadow-lg"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                              </svg>
                            </button>
                          </div>
                          
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                            <button 
                              onClick={nextImage}
                              className="p-3 bg-[#915eff]/20 hover:bg-[#915eff]/40 rounded-full text-white shadow-lg"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                              </svg>
                            </button>
                          </div>
                          
                          {/* Main Gallery View */}
                          <div className="relative shadow-[0_10px_30px_rgba(145,94,255,0.3)] rounded-lg overflow-hidden border border-[#915eff]/30 bg-[#1d1836]/70 max-h-[70vh]">
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                              <GlassButton
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (document.fullscreenElement) {
                                    document.exitFullscreen();
                                  } else {
                                    const imgElement = document.getElementById('gallery-image');
                                    if (imgElement) imgElement.requestFullscreen();
                                  }
                                }}
                                className="p-2 bg-[#915eff]/20 hover:bg-[#915eff]/30 text-white border border-[#915eff]/30"
                                title="Toggle Fullscreen"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <polyline points="9 21 3 21 3 15"></polyline>
                                  <line x1="21" y1="3" x2="14" y2="10"></line>
                                  <line x1="3" y1="21" x2="10" y2="14"></line>
                                </svg>
                              </GlassButton>
                              <GlassButton
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  window.open(project.image_gallery[currentImageIndex], '_blank');
                                }}
                                className="p-2 bg-[#915eff]/20 hover:bg-[#915eff]/30 text-white border border-[#915eff]/30"
                                title="Open original image"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                              </GlassButton>
                            </div>
                            
                            <img 
                              id="gallery-image"
                              src={project.image_gallery[currentImageIndex]}
                              alt={`${project.name} - Image ${currentImageIndex + 1}`}
                              className="max-w-full max-h-[70vh] object-contain p-2"
                            />
                          </div>
                        </>
                      )}
                      
                      {/* Thumbnails */}
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 px-2 w-full max-w-4xl justify-center">
                        {project.image_gallery.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentImageIndex(index);
                              setShowVideo(false);
                            }}
                            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                              currentImageIndex === index && !showVideo ? 'border-[#915eff]' : 'border-transparent'
                            } transition-all duration-200`}
                          >
                            <img 
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                        
                        {/* Video Thumbnail */}
                        {project.demo_video && (
                          <button
                            onClick={() => setShowVideo(true)}
                            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                              showVideo ? 'border-[#915eff]' : 'border-transparent'
                            } transition-all duration-200 bg-red-600/20`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#915eff" stroke="none">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          {/* Project Image, PDF Preview, or Gallery Preview */}
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
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  PDF
                </div>
                <div className="absolute bottom-3 right-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                      setSelectedProject(project);
                    }}
                    className="text-white bg-[#915eff]/80 hover:bg-[#915eff] px-2.5 py-1.5 rounded-full shadow-lg transition-all duration-300 text-xs font-medium flex items-center gap-1.5"
                    aria-label="View PDF in fullscreen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    View PDF
                  </button>
                </div>
              </div>
            ) : project.type === "gallery" && project.image_gallery && project.image_gallery.length > 0 ? (
              // Gallery Preview
              <div className="relative w-full h-full">
                <img
                  src={project.coverImage || `/Main(${project.name.split(' ')[1].replace('–', '').trim()}).png`}
                  onError={(e) => { e.target.onerror = null; e.target.src = project.image_gallery[0]; }}
                  alt={name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  Gallery
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                      setSelectedProject(project);
                    }}
                    className="text-white bg-[#915eff]/80 hover:bg-[#915eff] px-2.5 py-1.5 rounded-full shadow-lg transition-all duration-300 text-xs font-medium flex items-center gap-1.5"
                    aria-label="Open gallery in fullscreen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    View All
                  </button>
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
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt={name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute bottom-3 right-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                      setSelectedProject(project);
                    }}
                    className="text-white bg-[#915eff]/80 hover:bg-[#915eff] px-2.5 py-1.5 rounded-full shadow-lg transition-all duration-300 text-xs font-medium flex items-center gap-1.5"
                    aria-label="View details in fullscreen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    View Details
                  </button>
                </div>
              </div>
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
          <div className='p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4'>
            <div>
              <h3 className='text-gray-800 dark:text-white font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 group-hover:text-accent-purple transition-colors duration-300 leading-tight'>
                {name}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3'>
                {description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div className='flex flex-wrap gap-1.5 sm:gap-2'>
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 border border-accent-purple/20 rounded-full text-xs font-medium text-accent-purple hover:from-accent-purple/20 hover:to-accent-blue/20 transition-all duration-300"
                >
                  {tag.name}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-500 dark:text-gray-400">
                  +{tags.length - 4} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => onViewDetails(project)}
                icon={<Eye size={14} />}
                className="flex-1 text-xs sm:text-sm"
              >
                View Details
              </GlassButton>

              <div className="flex gap-2 sm:gap-3">
                {source_code_link && source_code_link !== "#" && (
                  <GlassButton
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(source_code_link, "_blank")}
                    icon={<Code size={14} />}
                    className="flex-1 text-xs sm:text-sm"
                  >
                    Code
                  </GlassButton>
                )}

                {live_demo_link && live_demo_link !== "#" && (
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(live_demo_link, "_blank")}
                    icon={<ExternalLink size={14} />}
                    className="flex-1 text-xs sm:text-sm"
                  >
                    Demo
                  </GlassButton>
                )}
              </div>
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
    <div className="relative min-h-[50vh] py-20 bg-gray-900/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/20 via-transparent to-accent-cyan/20 rounded-3xl" />

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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 place-items-center px-2 sm:px-4 lg:px-0'>
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
