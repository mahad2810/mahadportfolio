import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMic, FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { FaAt } from "react-icons/fa"; // Add @ icon
import { BsThreeDots } from "react-icons/bs";
import { styles } from "../styles";
import { profilePic } from "../assets";
// Simple text formatter for bot messages
const formatBotMessage = (text) => {
  return text
    .split('\n')
    .map((line, index) => {
      // Handle bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={index} className="flex items-start gap-2 my-1">
            <span className="text-accent-purple mt-1">•</span>
            <span>{line.replace(/^[•-]\s*/, '')}</span>
          </div>
        );
      }
      // Handle bold text (simple **text** format)
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="my-1">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }
      // Regular text
      return line.trim() ? <p key={index} className="my-1">{line}</p> : <br key={index} />;
    });
};

// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

// Using environment variables for API keys is more secure
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || "";
// Using OpenAI API by default, with fallback to Gemini
const USE_OPENAI = true; // Set to true to use OpenAI, false to use Gemini
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent";

// Fallback responses for when the API fails
const FALLBACK_RESPONSES = [
  "I'm Mahad Iqbal, a Generative AI Developer and Full-Stack Engineer studying B.Tech in CSE-AIML at Heritage Institute Of Technology, Kolkata. I specialize in AI applications and web development.",
  "I've worked as a Generative AI Developer Intern at AI Wallah where I developed MaveriqAir and MaverickBot. I've also interned as a Data Scientist at Pinnacle Labs working on NLP and sentiment analysis.",
  "My notable projects include AuraMed (healthcare platform), MaveriqAir (environmental dashboard), and Setuka (travel safety system). I've won multiple hackathons including 1st place at IEM Smart Make-A-Thon.",
  "I'm skilled in Python, C++, SQL, and web technologies like Next.js, Flask, and MongoDB. I also have expertise in machine learning with TensorFlow, PyTorch, and computer vision.",
  "I've led teams in hackathons and developed full-stack MVPs with React, Flask, and Firebase. My projects often integrate AI/ML solutions to address real-world problems in healthcare and environmental sectors."
];

const MAHAD_AI_PROMPT = `You are an AI chatbot named "Mahad.AI" integrated into Mahad Iqbal's portfolio website. Your tone should be friendly, confident, and professional. Your purpose is to introduce Mahad to portfolio visitors as if you are him in AI form. You should respond to questions about Mahad's skills, projects, achievements, background, and interests. Use first-person language like "I" to make it feel personal.

Here's the context to base your knowledge on:

PROFESSIONAL SUMMARY:
I'm Mahad Iqbal, a Generative AI developer and full-stack engineer with a proven record of delivering production-ready AI applications, from real-time dashboards to smart healthcare platforms. I'm an experienced team lead adept at architecting and deploying full-stack MVPs in competitive environments, recognized with multiple first-place hackathon victories and national-level finalist selections.

EDUCATION:
• Bachelor of Technology, CSE-AIML - Heritage Institute of Technology, Kolkata (2023-2027)
• Class XII - Seventh Day Adventist Senior Secondary School, Kolkata - ISC Board, Graduated with 94%
• Class X - Seventh Day Adventist Senior Secondary School, Kolkata - ICSE Board, Graduated with 94%

WORK EXPERIENCE:
• Generative AI Developer Intern at AI Wallah (Quirky Connections Pvt Ltd.) (July 2025 – Oct 2025)
  - Developed MaveriqAir, a real-time environmental dashboard with AQI-based health insights, animated weather effects, and an AI chatbot powered by Google Gemini and AirVisual API.
  - Built MaverickBot, a Next.js-based AI chatbot web app supporting context-aware chat, PDF-to-text parsing, and real-time Gemini 2.0 Flash responses using Radix UI and Tailwind CSS.
  - Gained hands-on experience in LLM integration, Generative AI deployment, and building production-ready AI interfaces.

• Data Science Intern at Pinnacle Labs (Dec 2024 – Jan 2025)
  - Built sentiment analysis and text classification models using Transformer-based architectures (e.g., BERT) and traditional ML algorithms.
  - Performed advanced text preprocessing, feature engineering, and model evaluation using libraries like NLTK, scikit-learn, and Transformers.
  - Explored Generative AI use-cases and enhanced NLP workflows with Prompt Engineering and contextual embeddings.

TECHNICAL SKILLS:
• Languages: Python, C++, SQL
• Data & ML: Pandas, Numpy, Matplotlib, Seaborn, Scikit-Learn, TensorFlow, PyTorch, OpenCV, LangChain
• ML & AI: Supervised and Unsupervised Learning, Deep Learning, Computer Vision, Feature Engineering and Data Science, Agentic Engineering
• Web Development: Next.js, FastAPI, Django, Flask, SQL, MongoDB
• Soft Skills: Team Management, Strategic Planning, Effective Communication, Problem-Solving, Accountability and Responsibility
• Languages: Fluent Proficiency in reading and writing English and Hindi

KEY PROJECTS:
• AuraMed – Smart Healthcare Platform
  - Led 3-member team to build a full-stack MVP using React, Flask, Firebase, and ML models (SVM, XGBoost)
  - Integrated geolocation-based SOS alerts, symptom prediction, and real-time resource tracking
  - Deployed on Google Cloud Platform with Docker containerization

• MaveriqAir – Environmental Dashboard
  - Real-time environmental dashboard with AQI-based health insights
  - Animated weather effects and an AI chatbot powered by Google Gemini and AirVisual API
  - Developed with Next.js and multiple API integrations

• Setuka – Digital Guardian for Travelers
  - AI+IoT ecosystem providing real-time safety for travelers
  - Integrated wearable telemetry for live vitals and location tracking
  - Implemented with React and Node.js

ACHIEVEMENTS:
• 1st Runners Up (2nd Place) – IdeateX 2025 (GDG-IDEATEX-2025) by Google Developer Groups (GDG) On Campus, HITK (July 2025)
• First Place Winner at the IEM Smart Make-A-Thon (Sept 2025)
• First Place Winner at the Hack Heritage 3.O by Heritage Institute Of Technology (Sept 2025)
• 3rd Place at HACK-O-NIT Grand Finale by Narula Institute of Technology, Kritanj '25

When answering questions:
• Be conversational, friendly and professional
• Use "I" statements to make answers personal
• If asked about specific technical skills or projects, provide relevant details from the above information
• Keep responses concise (3-4 sentences) for simple questions, but provide more detailed responses for complex technical questions
• If asked something you don't know about, respond honestly that you don't have that specific information
• Be ready to discuss any of the projects, skills, or achievements listed above in detail

You are NOT an agentic AI. You do not need to offer to help with tasks beyond answering questions about Mahad's portfolio, experience, and skills.`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Mahad.AI, your guide to Mahad's portfolio! I can answer questions about his skills, projects, education, and experience as a Generative AI Developer and Full-Stack Engineer. What would you like to know?", sender: "bot", timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2; // Maximum number of retry attempts
  const [isListening, setIsListening] = useState(false);
  const dropdownRef = useRef(null);
  // Only using AI Mode, no dropdown needed

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (!recognition) return;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // Function to fetch with timeout
  const fetchWithTimeout = async (url, options, timeout = 10000) => {
    const controller = new AbortController();
    const { signal } = controller;
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        controller.abort();
        reject(new Error("Request timed out"));
      }, timeout);
    });
    
    return Promise.race([
      fetch(url, { ...options, signal }),
      timeoutPromise
    ]);
  };

  // Get random fallback response
  const getFallbackResponse = () => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
    return FALLBACK_RESPONSES[randomIndex];
  };

  const fetchAIResponse = async (userMessage) => {
    try {
      if (USE_OPENAI) {
        // OpenAI API Call
        const response = await fetchWithTimeout(
          OPENAI_API_URL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "system",
                  content: MAHAD_AI_PROMPT
                },
                {
                  role: "user",
                  content: userMessage
                }
              ],
              temperature: 0.7,
              max_tokens: 500
            })
          },
          20000 // 20 second timeout
        );

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
          // Reset retry count on successful response
          setRetryCount(0);
          return data.choices[0].message.content;
        } else if (data.error) {
          console.error("API Error:", data.error);
          throw new Error(`API Error: ${data.error.message || "Unknown error"}`);
        } else {
          throw new Error("Invalid response format");
        }
      } else {
        // Gemini API Call
        const response = await fetchWithTimeout(
          `${GEMINI_API_URL}?key=${API_KEY}`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${MAHAD_AI_PROMPT}
                      
                      User message: ${userMessage}`
                    }
                  ]
                }
              ]
            })
          },
          15000 // 15 second timeout
        );

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          // Reset retry count on successful response
          setRetryCount(0);
          return data.candidates[0].content.parts[0].text;
        } else if (data.error) {
          console.error("API Error:", data.error);
          throw new Error(`API Error: ${data.error.message || "Unknown error"}`);
        } else {
          throw new Error("Invalid response format");
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    
    // Show bot typing indicator
    setIsTyping(true);
    
    // Store the message to use in retries
    const currentMessage = inputMessage;
    
    // Set a timeout for the typing indicator in case of very long delays
    const typingTimeout = setTimeout(() => {
      // If still typing after 20 seconds, show a temporary message
      if (isTyping) {
        const tempMessage = {
          id: `temp-${Date.now()}`,
          text: "I'm still thinking about your question. One moment please...",
          sender: "bot",
          timestamp: new Date(),
          isTemporary: true
        };
        
        setMessages(prev => [...prev, tempMessage]);
      }
    }, 20000);
    
    // Get response from AI model with retry logic
    try {
      let response;
      try {
        response = await fetchAIResponse(currentMessage);
      } catch (error) {
        // First retry attempt if we haven't exceeded max retries
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          console.log(`Retry attempt ${retryCount + 1}/${maxRetries}`);
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          response = await fetchAIResponse(currentMessage);
        } else {
          // All retries failed, use fallback
          throw new Error("Max retries reached");
        }
      }
      
      // Remove any temporary messages first
      setMessages(prev => prev.filter(msg => !msg.isTemporary));
      
      const botResponse = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in AI response:", error);
      
      // Remove any temporary messages first
      setMessages(prev => prev.filter(msg => !msg.isTemporary));
      
      const fallbackText = getFallbackResponse();
      const errorResponse = {
        id: messages.length + 2,
        text: fallbackText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      clearTimeout(typingTimeout);
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const widgetVariants = {
    closed: { scale: 0, opacity: 0, y: 20 },
    open: { scale: 1, opacity: 1, y: 0 },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  // Handle microphone button click
  const handleMicClick = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };



  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-0 border-2 border-white/20 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <img
            src={profilePic}
            alt="Mahad.AI"
            className="w-13 h-13 rounded-full object-cover"
          />
        )}
      </motion.button>

      {/* Chat widget */}
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-5 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border2 border-purple-600/30 z-50"
          variants={widgetVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7c3aed] to-[#9b5de5] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src={profilePic}
                  alt="Mahad.AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium">Mahad.AI</h3>
                <p className="text-purple-100 text-xs opacity-80">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setMinimized(!minimized)}
              >
                {minimized ? <FiMaximize2 className="text-white" /> : <FiMinimize2 className="text-white" />}
              </button>
            </div>
          </div>

          {/* Chat messages */}
          {!minimized && (
            <div 
              className="bg-[#121212] h-96 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  variants={bubbleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-[#a259ff] text-white rounded-tr-none"
                        : "bg-[#1e1e1e] text-gray-100 rounded-tl-none"
                    } ${message.isTemporary ? "opacity-70" : ""}`}
                  >
                    {message.sender === "bot" ? (
                      <div className="text-sm">
                        {formatBotMessage(message.text)}
                      </div>
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <span className={`text-xs mt-1 block ${
                      message.sender === "user" ? "text-purple-200" : "text-gray-400"
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-[#1e1e1e] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Input area */}
          {!minimized && (
            <div className="bg-[#1a1a1a] p-3 border-t border-[#333] flex items-center gap-2">
              {/* Mode selector removed - using only AI mode */}
              
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-[#262626] text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-gray-500"
              />
              <button className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-white/5 transition-colors" onClick={handleMicClick}>
                <FiMic className={`w-5 h-5 ${isListening ? "animate-pulse text-purple-300" : ""}`} />
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-[#9b5de5] text-white p-2 rounded-full flex items-center justify-center"
                disabled={isTyping}
              >
                <FiSend className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ChatWidget;