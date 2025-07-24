import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  KrishiMitra,
  jobit,
  tripguide,
  threejs,
  Edubyte,
  Trinoyon,
  MagicFill,
  GithubReadmeGenerator,
  YouTubeSummarizer,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "certifications",
    title: "Certifications",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Machine Learning Engineer",
    icon: web,
  },
  {
    title: "Data Scientist",
    icon: mobile,
  },
  {
    title: "AI/ML Developer",
    icon: backend,
  },
  {
    title: "Healthcare AI Specialist",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Flask",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Generative AI Developer Intern",
    company_name: "AI Wallah (Quality Connections Pvt Ltd)",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiM0RjQ2RTUiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QUk8L3RleHQ+Cjwvc3ZnPgo=",
    iconBg: "#383E56",
    date: "July 7, 2025 - October 7, 2025",
    points: [
      "Worked on real-world projects involving generative AI models and large language models (LLMs).",
      "Gained hands-on experience in developing and deploying generative AI applications.",
      "Focus Areas: LLMs, Generative AI, Project Deployment, Real-world AI Solutions.",
      "Collaborated with cross-functional teams to deliver production-ready AI solutions.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company_name: "CODSOFT",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiNGRjZCMzUiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q1M8L3RleHQ+Cjwvc3ZnPgo=",
    iconBg: "#E6DEDD",
    date: "February 2025 - March 2025",
    points: [
      "Genre Classification using Logistic Regression: Built a text classifier using TF-IDF and Logistic Regression with hyperparameter tuning to predict genres from descriptions.",
      "Customer Churn Prediction: Implemented Logistic Regression, Random Forest, and Gradient Boosting models; performed EDA, feature encoding, and model evaluation to predict churn.",
      "Spam Classification: Created a real-time SMS spam classifier with TF-IDF and saved the model using pickle for future predictions.",
      "Skills: Logistic Regression, Random Forest, Gradient Boosting, TF-IDF, Scikit-learn, Pickle, GridSearchCV, Data Preprocessing.",
    ],
  },
  {
    title: "Data Analysis Intern - Restaurant EDA",
    company_name: "Independent Project",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiMwNTk2NjkiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+REE8L3RleHQ+Cjwvc3ZnPgo=",
    iconBg: "#383E56",
    date: "January 2025 - February 2025",
    points: [
      "Conducted exploratory data analysis on restaurant data to identify trends in cuisines, city-wise ratings, price ranges, online delivery, and text review sentiment.",
      "Identified top 3 cuisines and cities with highest number of restaurants.",
      "Visualized price distribution and delivery-based rating comparisons.",
      "Performed sentiment keyword extraction and correlation analysis between votes and ratings. Skills: Pandas, Seaborn, Matplotlib, Text Analysis, Visualization, EDA, Data Cleaning.",
    ],
  },
  {
    title: "Data Science Virtual Intern",
    company_name: "Pinnacle Labs",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiM4NkJDMjUiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UEw8L3RleHQ+Cjwvc3ZnPgo=",
    iconBg: "#E6DEDD",
    date: "December 12, 2024 - January 11, 2025",
    points: [
      "Certificate ID: PL/2024/DECP4/079 - Worked on data science projects and demonstrated commendable performance in problem-solving, exploratory analysis, and deriving actionable insights from datasets.",
      "Built advanced analytics and text classification models using Transformer-based architectures (e.g., BERT) and traditional ML algorithms.",
      "Performed advanced text preprocessing, feature engineering, and model evaluation using libraries like NLTK, scikit-learn, and Transformers.",
      "Explored Generative AI use-cases and enhanced NLP workflows with Prompt Engineering and contextual understanding.",
    ],
  },
  {
    title: "Student",
    company_name: "Heritage Institute of Technology, Kolkata",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiNEQzI2MjYiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SElUPC90ZXh0Pgo8L3N2Zz4K",
    iconBg: "#383E56",
    date: "2023 - 2027",
    points: [
      "Pursuing B.Tech in Computer Science & Engineering (AI & ML) with strong foundation in CS fundamentals.",
      "Actively improving data structures and algorithms (DSA) skills by solving problems on LeetCode and participating in coding challenges.",
      "Built and deployed machine learning projects like healthcare platforms and crop yield prediction systems.",
      "Strong foundation in CS fundamentals and passionate about building scalable, impactful systems.",
    ],
  },
];



const projects = [
  {
    name: "🌐 AuraMed – AI-Powered Healthcare Logistics Platform",
    description: "A unified digital healthcare ecosystem designed to modernize both rural and urban healthcare delivery.",
    fullDescription: `A unified digital healthcare ecosystem designed to modernize both rural and urban healthcare delivery. AuraMed features dual dashboards—one for patients, one for hospitals—enabling appointment booking, AI-powered symptom checking, emergency SOS services, real-time bed and doctor availability, and hospital inventory control.

**Key Features:**
• AI-driven chatbot and disease predictor
• SOS button with multilingual voice & GPS alerts
• Real-time hospital resource monitoring
• Google OAuth, secure health records, video consultations
• Modular backend, GCP deployment, multi-tenant architecture

**Role:** Full-Stack Developer · Team Lead
**Hackathon:** Ideatex – Creative Mode | Team NeuroHack`,
    tags: [
      { name: "Python Flask", color: "blue-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Firebase", color: "pink-text-gradient" },
      { name: "React.js", color: "blue-text-gradient" },
      { name: "WebRTC", color: "orange-text-gradient" },
      { name: "Dialogflow", color: "green-text-gradient" },
      { name: "Twilio", color: "pink-text-gradient" },
      { name: "TensorFlow", color: "orange-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=AuraMed",
    source_code_link: "https://auramed-app-156513904358.us-central1.run.app",
    live_demo_link: "https://auramed-app-156513904358.us-central1.run.app",
    demo_video: "#",
    snapshots: "#",
    category: "ai"
  },
  {
    name: "🌍 MaveriqAir – Environmental Intelligence & AQI Forecasting",
    description: "A modular platform that combines live CPCB data, Sentinel-5P satellite imagery, and AI-based forecasting to monitor air pollution and urban flooding in India.",
    fullDescription: `MaveriqAir is a modular platform that combines live CPCB data, Sentinel-5P satellite imagery, and AI-based forecasting to monitor air pollution and urban flooding in India. It provides 72-hour AQI predictions, pollution source mapping, and flood alerts.

**Key Features:**
• AI-predicted AQI forecasts (24–72 hrs)
• Real-time waterlogging detection for commuters
• Pollution source overlays: fire zones, industrial clusters
• Multilingual health alerts with offline support
• Progressive Web App optimized for low-connectivity areas

**Role:** Full-Stack Developer
**Hackathon:** Ideatex – Bone Meal | Team Interstellar Maverick`,
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Python", color: "green-text-gradient" },
      { name: "WebSockets", color: "pink-text-gradient" },
      { name: "Satellite APIs", color: "orange-text-gradient" },
      { name: "Machine Learning", color: "blue-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/059669/FFFFFF?text=MaveriqAir",
    source_code_link: "#",
    live_demo_link: "#",
    demo_video: "#",
    category: "ai"
  },
  {
    name: "🧬 DA(CV) – Lung Cancer Prediction & Data Analysis",
    description: "A deep-dive data analysis project using a dataset of 220,000+ individuals to identify lung cancer risk factors and survival patterns.",
    fullDescription: `A deep-dive data analysis project using a dataset of 220,000+ individuals to identify lung cancer risk factors and survival patterns. Utilized SQL queries for insights, performed statistical analysis, and built an interactive Power BI dashboard for healthcare recommendations.

**Key Features:**
• Advanced SQL analysis (basic to advanced queries)
• Correlation between smoking, pollution, and cancer prevalence
• Predictive indicators by country, gender, and detection timing
• Strategic insights for early detection and treatment programs

**Role:** Data Analyst
**Platform:** Futurion Upskilling India Portfolio Challenge`,
    tags: [
      { name: "PostgreSQL", color: "blue-text-gradient" },
      { name: "Excel", color: "green-text-gradient" },
      { name: "Power BI", color: "pink-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Data+Analysis",
    source_code_link: "#",
    category: "data"
  },
  {
    name: "🤖 Computer Vision Suite with MediaPipe",
    description: "A robust collection of real-time computer vision tools built using MediaPipe and OpenCV.",
    fullDescription: `A robust collection of real-time computer vision tools built using MediaPipe and OpenCV. Features include human pose estimation, facial mesh detection, hand gesture recognition, and interactive gesture-controlled utilities like virtual mouse and volume control.

**Modules Implemented:**
• Real-time pose estimation and landmark detection
• Gesture recognition with finger tracking
• Virtual mouse and volume control via gestures
• Face mesh (468 landmark points) with live face analytics
• Modular, class-based architecture optimized for live video

**Role:** Computer Vision Engineer`,
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "OpenCV", color: "green-text-gradient" },
      { name: "MediaPipe", color: "pink-text-gradient" },
      { name: "NumPy", color: "orange-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Computer+Vision",
    source_code_link: "#",
    category: "ai"
  },
  {
    name: "📈 Trade2Algo – Full-Stack Trading Dashboard",
    description: "A scalable trading interface supporting live market data, multi-type order placement, and portfolio analytics.",
    fullDescription: `Trade2Algo is a scalable trading interface supporting live market data, multi-type order placement, and portfolio analytics. Built with a clean modular structure and secure token-based authentication, it supports real-time updates without page reloads.

**Core Features:**
• Real-time price streaming & OHLC charts
• Complete order lifecycle (Market, Limit, SL)
• Position monitoring and trade history
• JWT-based auth with async WebSocket connections
• Dashboard and market watch with live P&L tracking

**Role:** Full-Stack Developer`,
    tags: [
      { name: "Python Flask", color: "blue-text-gradient" },
      { name: "WebSockets", color: "green-text-gradient" },
      { name: "Vanilla JS", color: "pink-text-gradient" },
      { name: "Plotly.js", color: "orange-text-gradient" },
      { name: "JWT", color: "blue-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/0891B2/FFFFFF?text=Trade2Algo",
    source_code_link: "#",
    category: "fullstack"
  }
];

export { services, technologies, experiences, projects };
