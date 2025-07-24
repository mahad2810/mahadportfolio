import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
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

const certificationsData = [
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
    issuerLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiNGRjZCMzUiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SVMgPC90ZXh0Pgo8L3N2Zz4K",
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
    issuerLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiM0RjQ2RTUiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SUlUPC90ZXh0Pgo8L3N2Zz4K",
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
    issuerLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiM4NkJDMjUiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+REw8L3RleHQ+Cjwvc3ZnPgo=",
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
    issuerLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiMxRjRFNzkiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VEFUQTwvdGV4dD4KPC9zdmc+Cg==",
    date: "June 2025",
    level: "Business Analytics",
    credentialId: "TATA-VIZ-2025",
    verifyLink: "#",
    skills: ["Data Visualization", "Dashboard Design", "Business Intelligence", "Visual Storytelling"],
    description: "Practiced visual storytelling and dashboard design. Focused on framing business problems, selecting optimal charts, and delivering insights for data-driven decisions.",
    image: tataCert
  }
];

const CertificationCard = ({ cert, index }) => {
  if (!cert) return null;

  return (
    <div className="w-full">
      <GlassCard
        variant="default"
        className="p-6 h-full hover:scale-[1.02] transition-transform duration-300 group"
      >
        <div className="space-y-4">
          {/* Header with logo and issuer */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0 shadow-sm">
              <img
                src={cert.issuerLogo}
                alt={cert.issuer}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzhiNWNmNiIvPgo8cGF0aCBkPSJNMzIgMTZMMzggMjhIMjZMMzIgMTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzIgNDhMMjYgMzZIMzhMMzIgNDhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                }}
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-accent-purple transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="text-accent-purple font-semibold mb-2">
                {cert.issuer}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
                <Calendar size={14} />
                <span>{cert.date}</span>
              </div>
              {cert.level && (
                <div className="text-xs text-accent-blue font-medium">
                  {cert.level}
                </div>
              )}
            </div>

            <div className="text-accent-purple">
              <Award size={24} />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {cert.description}
          </p>

          {/* Skills */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
              Skills Covered:
            </h4>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 border border-accent-purple/20 rounded-full text-xs font-medium text-accent-purple"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certificate Image Preview */}
          {cert.image && (
            <div className="pt-4 border-t border-white/10 dark:border-white/5">
              <div className="relative group cursor-pointer" onClick={() => window.open(cert.image, "_blank")}>
                <img
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  className="w-full h-32 object-cover rounded-lg border border-white/20 dark:border-white/10 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <ExternalLink size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* Credential ID and Verify Button */}
          <div className="pt-4 border-t border-white/10 dark:border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle size={14} className="text-green-500" />
              <span>Credential ID: {cert.credentialId}</span>
            </div>

            <div className="flex gap-2">
              <GlassButton
                variant="outline"
                size="sm"
                onClick={() => window.open(cert.verifyLink, "_blank")}
                icon={<ExternalLink size={14} />}
                className="flex-1"
              >
                Verify
              </GlassButton>
              {cert.image && (
                <GlassButton
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(cert.image, "_blank")}
                  icon={<Award size={14} />}
                  className="flex-1"
                >
                  View Certificate
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const Certifications = () => {
  console.log('Certifications component rendering...', certificationsData.length, 'certificates');

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-pink/5 rounded-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Professional Achievements
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            📜 Certifications & Awards
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert, index) => (
            <CertificationCard
              key={cert.credentialId || index}
              cert={cert}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <GlassCard variant="primary" className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-200 mb-6">
              I'm committed to staying updated with the latest technologies and industry best practices
              through continuous learning and professional development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlassButton
                variant="secondary"
                size="md"
                onClick={() => window.open("https://www.linkedin.com/in/mahadiqbal16/", "_blank")}
              >
                View LinkedIn Profile
              </GlassButton>
              <GlassButton
                variant="ghost"
                size="md"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Certifications, "certifications");
