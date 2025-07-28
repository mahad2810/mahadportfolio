import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { GlassCard, GlassButton } from './ui';

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Product Manager",
    company: "TechCorp Inc.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial: "Bikram delivered exceptional work on our web application. His attention to detail and technical expertise made our project a huge success. The glassmorphism design he implemented was exactly what we envisioned.",
    project: "E-commerce Platform Redesign"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CTO",
    company: "StartupXYZ",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial: "Working with Bikram was a game-changer for our startup. He not only built our MVP but also provided valuable insights on user experience and performance optimization. Highly recommended!",
    project: "SaaS MVP Development"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Design Lead",
    company: "Creative Agency",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial: "Bikram's ability to translate complex designs into pixel-perfect, interactive web experiences is remarkable. His knowledge of modern frameworks and attention to detail is outstanding.",
    project: "Portfolio Website Development"
  },
  {
    id: 4,
    name: "David Kumar",
    position: "Founder",
    company: "InnovateLab",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial: "The AI-powered features Bikram integrated into our platform exceeded our expectations. His expertise in machine learning and web development made him the perfect choice for our project.",
    project: "AI Dashboard Integration"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Marketing Director",
    company: "GrowthCo",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial: "Bikram's work on our landing pages resulted in a 40% increase in conversions. His understanding of both technical implementation and user psychology is impressive.",
    project: "Landing Page Optimization"
  }
];

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.9 
      }}
      transition={{ duration: 0.5 }}
      className={`${isActive ? 'z-10' : 'z-0'}`}
    >
      <GlassCard
        variant="default"
        className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto text-center relative"
      >
        {/* Quote Icon */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-accent-purple/30">
          <Quote size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
        </div>

        {/* Rating Stars */}
        <div className="flex justify-center gap-0.5 sm:gap-1 mb-4 sm:mb-6 mt-2 sm:mt-0">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-yellow-400 fill-current sm:w-5 sm:h-5"
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 italic px-2 sm:px-4">
          "{testimonial.testimonial}"
        </blockquote>

        {/* Author Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-accent-purple/30 flex-shrink-0"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=8b5cf6&color=fff&size=64`;
            }}
          />
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white">
              {testimonial.name}
            </h4>
            <p className="text-accent-purple font-semibold text-sm sm:text-base">
              {testimonial.position}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {testimonial.company}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              Project: {testimonial.project}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonialsData.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonialsData.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-blue/5 rounded-3xl" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            What People Say
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Client Testimonials
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Navigation Buttons - Hidden on mobile, shown on larger screens */}
          <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={goToPrevious}
              icon={<ChevronLeft size={18} />}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
            />
          </div>

          <div className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={goToNext}
              icon={<ChevronRight size={18} />}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
            />
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex sm:hidden justify-between items-center mb-4 px-4">
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={goToPrevious}
              icon={<ChevronLeft size={16} />}
              className="rounded-full w-10 h-10 p-0"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1} / {testimonialsData.length}
            </span>
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={goToNext}
              icon={<ChevronRight size={16} />}
              className="rounded-full w-10 h-10 p-0"
            />
          </div>

          {/* Testimonial Cards */}
          <div className="px-2 sm:px-8 lg:px-16">
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={currentIndex}
                testimonial={testimonialsData[currentIndex]}
                isActive={true}
              />
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent-purple scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-accent-purple/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="mt-12 sm:mt-16 px-2 sm:px-4"
        >
          <GlassCard variant="primary" className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">50+</h4>
                <p className="text-gray-200 text-sm sm:text-base">Happy Clients</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">98%</h4>
                <p className="text-gray-200 text-sm sm:text-base">Satisfaction Rate</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">24/7</h4>
                <p className="text-gray-200 text-sm sm:text-base">Support Available</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 1)}
          className="text-center mt-8 sm:mt-12 px-2 sm:px-4"
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
            Ready to join these satisfied clients?
          </p>
          <GlassButton
            variant="primary"
            size="md"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto"
          >
            Start Your Project
          </GlassButton>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonials, "testimonials");
