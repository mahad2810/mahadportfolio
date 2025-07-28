import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, Phone, MapPin, Send, CheckCircle, X } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, textVariant } from "../utils/motion";
import { GlassCard, GlassButton, GlassInput } from "./ui";

const contactInfo = [
  {
    icon: <Mail size={24} />,
    title: "Email",
    value: "mahadiqbal70@gmail.com",
    link: "mailto:mahadiqbal70@gmail.com"
  },
  {
    icon: <Phone size={24} />,
    title: "Phone",
    value: "+91-3352932558",
    link: "tel:+913352932558"
  },
  {
    icon: <MapPin size={24} />,
    title: "Location",
    value: "38, Topsia 2nd Lane, Kolkata",
    link: "#"
  }
];

const socialLinks = [
  {
    icon: <Github size={24} />,
    name: "GitHub",
    url: "https://github.com/mahad2810/",
    color: "hover:text-gray-800 dark:hover:text-white"
  },
  {
    icon: <Linkedin size={24} />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mahadiqbal16/",
    color: "hover:text-blue-600"
  },
  {
    icon: <Mail size={24} />,
    name: "Email",
    url: "mailto:mahadiqbal70@gmail.com",
    color: "hover:text-red-500"
  }
];

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setLoading(true);

    // Create template params for EmailJS
    const templateParams = {
      user_name: form.name,
      user_email: form.email,
      title: form.subject,
      message: form.message,
    };

    emailjs
      .send(
        import.meta.env.EMAILJS_SERVICE_ID || 'your_service_id',
        import.meta.env.EMAILJS_TEMPLATE_ID || 'your_template_id',
        templateParams,
        import.meta.env.EMAILJS_PUBLIC_KEY || 'your_public_key'
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setLoading(false);
          toast.success("Message sent successfully! I'll get back to you soon.");

          setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          setLoading(false);
          toast.error("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="relative">
      <Toaster position="top-right" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-blue/5 rounded-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400`}>
            Get In Touch
          </p>
          <h2 className={`${styles.sectionHeadText} text-gray-800 dark:text-white`}>
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Whether you have a project in mind, need consultation,
            or just want to connect, I'm here to help. Let's create something extraordinary together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] order-2 lg:order-1">
            <GlassCard variant="default" className="p-4 sm:p-6 lg:p-8">
              <div className="mb-6 sm:mb-8">
                <p className={`${styles.sectionSubText} text-gray-500 dark:text-gray-400 text-center lg:text-left`}>
                  Get in touch
                </p>
                <h3 className={`${styles.sectionHeadText} text-gray-800 dark:text-white text-center lg:text-left`}>
                  Contact Me
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <GlassInput
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="What's your name?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <GlassInput
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="What's your email address?"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <GlassInput
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="What's the subject of your message?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <GlassInput
                    name="message"
                    multiline
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder="Share details about your project, timeline, requirements, or just say hello! I'd love to hear from you."
                    required
                  />
                </div>

                <GlassButton
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  icon={<Send size={18} />}
                  className="w-full sm:w-auto sm:px-8"
                >
                  {loading ? "Sending..." : "Send Message"}
                </GlassButton>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info & 3D Earth */}
          <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            {/* Contact Information */}
            <GlassCard variant="minimal" className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center lg:text-left">
                Contact Information
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                    className="flex items-center gap-3 sm:gap-4 group"
                  >
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-full group-hover:from-accent-purple/30 group-hover:to-accent-blue/30 transition-all duration-300 flex-shrink-0">
                      <div className="text-accent-purple">
                        {React.cloneElement(info.icon, { size: window.innerWidth < 640 ? 18 : 24 })}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                        {info.title}
                      </h4>
                      <a
                        href={info.link}
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-accent-purple transition-colors duration-300 break-words"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Social Links */}
            <GlassCard variant="minimal" className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center lg:text-left">
                Follow Me
              </h3>

              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                    className={`p-3 sm:p-4 glass backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:border-accent-purple/50`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {React.cloneElement(social.icon, { size: window.innerWidth < 640 ? 20 : 24 })}
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            {/* 3D Earth */}
            <div className="h-[250px] sm:h-[300px] lg:h-[350px] rounded-xl sm:rounded-2xl overflow-hidden">
              <EarthCanvas />
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 1)}
          className="mt-12 sm:mt-16 text-center px-2 sm:px-4"
        >
          <GlassCard variant="primary" className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-gray-200 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
              Whether you have a project in mind, need technical consultation, or just want to connect,
              I'm always excited to discuss new opportunities and collaborations.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <GlassButton
                variant="secondary"
                size="md"
                onClick={() => window.open("https://calendly.com/your-link", "_blank")}
                className="w-full sm:w-auto"
              >
                Schedule a Call
              </GlassButton>
              <GlassButton
                variant="ghost"
                size="md"
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="w-full sm:w-auto"
              >
                Download Resume
              </GlassButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
