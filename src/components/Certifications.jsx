import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle, Eye, X } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { GlassCard, GlassButton } from './ui';

// Import certificate images
import geminiCert from '../assets/certifications/genai1.png';
import multimodalCert from '../assets/certifications/genai2.png';
import promptCert from '../assets/certifications/genai3.png';
import dataScienceCert from '../assets/certifications/datasciencenternshala.png';
import nptelCert from '../assets/certifications/nptellab.png';
import deloitteCert from '../assets/certifications/delolitte.png';
import tataCert from '../assets/certifications/tatagrp.png';
import hackointCert from '../assets/certifications/hackonit.png';
import gdgCert from '../assets/certifications/gdg.jpeg';

//import icons
import tataLogo from '../assets/company/Tata_logo.svg';
import hackonitLogo from '../assets/company/nit.jpg';
import delollite from '../assets/company/Deloitte.png';
import nptelLogo from '../assets/company/nptel.png';
import gdg from '../assets/company/gdg.png';
import internshala from '../assets/company/internshala.jpg';


const certificationsData = [
  {
    title: "Certificate of Achievement - Google Developer Groups",
    issuer: "Google Developer Groups (GDG)",
    issuerLogo: gdg,
    date: "2024",
    level: "Community Achievement",
    credentialId: "GDG-ACHIEVEMENT-2024",
    verifyLink: "#",
    skills: ["Google Technologies", "Developer Community", "Technical Leadership", "Knowledge Sharing"],
    description: "Recognized for outstanding contribution and participation in Google Developer Groups community activities. Demonstrated commitment to learning and sharing Google technologies and best practices.",
    image: gdgCert
  },
  {
    title: "HACK-O-NiT 36hr Overnight Hackathon",
    issuer: "Heritage Institute of Technology",
    issuerLogo: hackonitLogo,
    date: "March 20-21, 2025",
    level: "36-hour Overnight Hackathon",
    credentialId: "HACK-O-NiT-2025",
    verifyLink: "#",
    skills: ["Problem Solving", "Team Collaboration", "Innovation", "Rapid Prototyping", "Technical Implementation"],
    description: "Participated in an intensive 12-hour overnight hackathon organized by Heritage Institute of Technology. Demonstrated exceptional problem-solving skills, creativity, and technical expertise in developing innovative solutions under time constraints.",
    image: hackointCert
  },
  {
    title: "Build Real World AI Applications with Gemini and Imagen",
    issuer: "Google Cloud",
    issuerLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    date: "July 2025",
    level: "Introductory Level",
    credentialId: "GEMINI-AI-2025",
    verifyLink: "#",
    skills: ["Gemini", "Imagen", "Vertex AI", "AI Applications"],
    description: "Hands-on project-based learning with Google's Gemini and Imagen models. Covered AI-based app development including text summarization, image generation, and context-aware assistants using Vertex AI.",
    image: geminiCert
  },
  {
    title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
    issuer: "Google Cloud",
    issuerLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    date: "July 2025",
    level: "Intermediate Level",
    credentialId: "MULTIMODAL-RAG-2025",
    verifyLink: "#",
    skills: ["Multimodal LLMs", "RAG", "Document Analysis", "PDF Processing"],
    description: "Built advanced document analysis systems using multimodal LLMs. Focused on extracting insights from scanned forms, PDFs, and images using Retrieval-Augmented Generation (RAG).",
    image: multimodalCert
  },
  {
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
    issuerLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    date: "July 2025",
    level: "Introductory Level",
    credentialId: "PROMPT-DESIGN-2025",
    verifyLink: "#",
    skills: ["Prompt Engineering", "Vertex AI", "Chatbots", "Content Generation"],
    description: "Mastered prompt engineering within Vertex AI. Designed and tested prompts for chatbots, classification, and content generation. Learned to fine-tune behavior using parameters like temperature and context windowing.",
    image: promptCert
  },
  {
    title: "Data Science Training",
    issuer: "Internshala x Heritage Institute of Technology",
    issuerLogo: internshala,
    date: "August 3, 2024",
    level: "8-week Comprehensive Course",
    credentialId: "DS-TRAINING-2024",
    verifyLink: "#",
    skills: ["Data Science", "Data Analysis", "Data Visualization", "Predictive Analytics", "Machine Learning", "AI"],
    description: "Completed an 8-week comprehensive course covering Introduction to Data Science, Data Analysis Fundamentals, Data Visualization, Predictive Analytics using Machine Learning, AI in Data Science, and Capstone project.",
    image: dataScienceCert
  },
  {
    title: "Emerging Point-of-Care Diagnostic Technologies",
    issuer: "NPTEL Lab Workshop (IIT Kharagpur + IIT Madras)",
    issuerLogo: nptelLogo,
    date: "November 25–30, 2024",
    level: "Week-long Lab Training",
    credentialId: "NPTEL-DIAG-2024",
    verifyLink: "#",
    skills: ["Diagnostic Technologies", "Healthcare", "Point-of-Care", "Public Health"],
    description: "Participated in a week-long lab training on diagnostic tech for healthcare, led by Prof. Suman Chakraborty. Explored real-time, low-cost diagnostic solutions and their applications in public health systems.",
    image: nptelCert
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    issuerLogo: delollite,
    date: "June 2025",
    level: "Professional Simulation",
    credentialId: "DELOITTE-SIM-2025",
    verifyLink: "#",
    skills: ["Data Analytics", "Fraud Detection", "Forensic Analysis", "Client Reporting"],
    description: "Simulated real-world data analyst responsibilities including fraud detection, forensic analysis, and client reporting using business data.",
    image: deloitteCert
  },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "TATA (via Forage)",
    issuerLogo: tataLogo,
    date: "June 2025",
    level: "Business Analytics",
    credentialId: "TATA-VIZ-2025",
    verifyLink: "#",
    skills: ["Data Visualization", "Dashboard Design", "Business Intelligence", "Visual Storytelling"],
    description: "Practiced visual storytelling and dashboard design. Focused on framing business problems, selecting optimal charts, and delivering insights for data-driven decisions.",
    image: tataCert
  }
];

const CertificationModal = ({ cert, isOpen, onClose }) => {
  if (!isOpen || !cert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
                    src={cert.issuerLogo}
                    alt={cert.issuer}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {cert.title}
                  </h2>
                  <p className="text-lg text-accent-purple font-semibold mb-2">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-400" />
                        <span>{cert.credentialId}</span>
                      </div>
                    )}
                  </div>
                  {cert.level && (
                    <div className="text-accent-cyan font-medium text-sm mt-2">
                      {cert.level}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {cert.description}
              </p>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-gray-600 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {cert.image && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Certificate</h3>
                  <img
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    className="w-full rounded-lg border border-white/20"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(cert.verifyLink, "_blank")}
                  icon={<ExternalLink size={14} />}
                >
                  Verify Certificate
                </GlassButton>
                {cert.image && (
                  <GlassButton
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(cert.image, "_blank")}
                    icon={<Award size={14} />}
                  >
                    View Full Certificate
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

const CertificationCard = ({ cert, index, onViewDetails }) => {
  if (!cert) return null;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full sm:w-[300px]"
    >
      <GlassCard
        variant="default"
        className="p-6 h-full hover:scale-[1.02] transition-transform duration-300 group cursor-pointer"
        onClick={() => onViewDetails(cert)}
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-lg p-2 mx-auto">
            <img
              src={cert.issuerLogo}
              alt={cert.issuer}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-accent-purple transition-colors line-clamp-2">
              {cert.title}
            </h3>
            <p className="text-accent-purple font-semibold">
              {cert.issuer}
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

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <div className="relative glass-strong rounded-3xl p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-pink/10 rounded-3xl" />

      <div className="relative z-10">
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Professional Achievements
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Certifications & Awards
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
          {certificationsData.map((cert, index) => (
            <CertificationCard
              key={cert.credentialId || index}
              cert={cert}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <CertificationModal
          cert={selectedCert}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Certifications, "certifications");
