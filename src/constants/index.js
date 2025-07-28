import {
  aiwallah,
  pinnacle,
  codsoft,
} from "../assets";

// Import PDF projects from assets
import DAProject from "../assets/projects/DA(CV).pdf";
import MaveriqAirProject from "../assets/projects/MaveriqAir.pdf";
import AuraMedProject from "../assets/projects/Snapshots (AuraMed).pdf";
import Trade2AlgoProject from "../assets/projects/Trade2Algo.pdf";

// Import tech images from local assets
import pythonImg from "../assets/tech/python.jpg";
import reactImg from "../assets/tech/react.png";
import dockerImg from "../assets/tech/docker.webp";
import firebaseImg from "../assets/tech/firebase.png";
import flaskImg from "../assets/tech/flask.jpg";
import gcpImg from "../assets/tech/gcp.png";
import gitImg from "../assets/tech/git.png";
import nextjsImg from "../assets/tech/nextjs.jpg";
import opencvImg from "../assets/tech/opencv.png";
import powerbiImg from "../assets/tech/powerbi.jpg";
import scikitImg from "../assets/tech/scikit.png";
import tableauImg from "../assets/tech/tableau.png";
import tensorflowImg from "../assets/tech/tensorflow.jpg";

export const navLinks = [
  {
    id: "dashboard",
    title: "Dashboard",
  },
  {
    id: "about",
    title: "About Me",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "tech",
    title: "Technologies",
  },
  {
    id: "projects",
    title: "Projects",
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



const technologies = [
  // Programming Languages
  {
    name: "Python",
    icon: pythonImg,
    category: "languages"
  },

  // Frontend Technologies
  {
    name: "React JS",
    icon: reactImg,
    category: "frontend"
  },
  {
    name: "Next.js",
    icon: nextjsImg,
    category: "frontend"
  },

  // Backend & Frameworks
  {
    name: "Flask",
    icon: flaskImg,
    category: "backend"
  },

  // AI/ML & Data Science
  {
    name: "TensorFlow",
    icon: tensorflowImg,
    category: "ai-ml"
  },
  {
    name: "OpenCV",
    icon: opencvImg,
    category: "ai-ml"
  },
  {
    name: "Scikit-learn",
    icon: scikitImg,
    category: "ai-ml"
  },

  // Cloud & DevOps
  {
    name: "Docker",
    icon: dockerImg,
    category: "devops"
  },
  {
    name: "Google Cloud Platform",
    icon: gcpImg,
    category: "devops"
  },
  {
    name: "Firebase",
    icon: firebaseImg,
    category: "devops"
  },

  // Tools & Analytics
  {
    name: "Git",
    icon: gitImg,
    category: "tools"
  },
  {
    name: "Power BI",
    icon: powerbiImg,
    category: "analytics"
  },
  {
    name: "Tableau",
    icon: tableauImg,
    category: "analytics"
  },
];

const experiences = [
  {
    title: "Generative AI Developer Intern",
    company_name: "AI Wallah (Quality Connections Pvt Ltd)",
    icon: aiwallah,
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
    icon: codsoft,
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
    title: "Data Analysis Intern",
    company_name: "Cognizify Technologies",
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
    icon: pinnacle,
    iconBg: "#E6DEDD",
    date: "December 12, 2024 - January 11, 2025",
    points: [
      "Certificate ID: PL/2024/DECP4/079 - Worked on data science projects and demonstrated commendable performance in problem-solving, exploratory analysis, and deriving actionable insights from datasets.",
      "Built advanced analytics and text classification models using Transformer-based architectures (e.g., BERT) and traditional ML algorithms.",
      "Performed advanced text preprocessing, feature engineering, and model evaluation using libraries like NLTK, scikit-learn, and Transformers.",
      "Explored Generative AI use-cases and enhanced NLP workflows with Prompt Engineering and contextual understanding.",
    ],
  },
];



const projects = [
  {
    name: "🌐 AuraMed – Revolutionizing Hospital Operations & Patient Care",
    description: "AuraMed bridges the gap between patients and healthcare providers by offering a unified, intelligent platform that enhances healthcare accessibility, continuity, and operational efficiency.",
    fullDescription: `AuraMed bridges the gap between patients and healthcare providers by offering a unified, intelligent platform that enhances healthcare accessibility, continuity, and operational efficiency. It is a dual-interface hospital management system designed to serve both patients and hospitals through powerful features and real-time connectivity.

**🔹 Patient Dashboard (for Individuals & Families):**

**Health Monitoring & Management:**
• Book appointments with doctors and schedule lab tests
• Access real-time health reports and medical history
• Receive automated health alerts and medication reminders
• Connect with family members for health updates and emergency notifications

**Communication & Support:**
• Direct video calling with healthcare providers
• AI-powered chatbot for instant medical queries and guidance
• Emergency contact system for critical health situations
• Multilingual support for diverse patient populations

**🔹 Hospital Dashboard (for Healthcare Providers):**

**Patient Management System:**
• Admit patients and track their real-time health metrics via connected devices (ECG, monitors, etc.)
• Generate and send daily health reports to family members

**Hospital Operations Management:**
• Manage doctor appointments, lab test slots, and bed availability
• Automate inventory and resource tracking
• Enable direct communication through video calling with patients and families

By connecting health monitoring devices to the web platform, AuraMed offers continuous insights and efficient management of hospital operations while empowering patients with control over their care.

**Role:** Full-Stack Developer`,
    tags: [
      { name: "Flask", color: "blue-text-gradient" },
      { name: "Full-Stack Development", color: "green-text-gradient" },
      { name: "Docker", color: "pink-text-gradient" },
      { name: "Google Cloud Platform", color: "orange-text-gradient" },
      { name: "MongoDB", color: "blue-text-gradient" },
      { name: "Twilio", color: "green-text-gradient" },
      { name: "TensorFlow", color: "pink-text-gradient" },
      { name: "Dialogflow", color: "orange-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/059669/FFFFFF?text=AuraMed",
    source_code_link: "#",
    demo_video: "https://www.youtube.com/watch?v=ECsVEbnQ51I",
    category: "ai",
    pdf_file: AuraMedProject,
    type: "pdf"
  },
  {
    name: "🌍 MaveriqAir – Real-Time Air Quality Visualizer & Forecast App",
    description: "Developed MaveriqAir, a real-time web platform addressing air quality monitoring and urban flooding alerts in India.",
    fullDescription: `Developed MaveriqAir, a real-time web platform addressing air quality monitoring and urban flooding alerts in India. The system integrates CPCB ground sensors, high-resolution satellite data (Sentinel-5P), and AI-based forecasting models to deliver hyperlocal AQI insights and 24–72 hour forecasts.

**Key Highlights:**
• **Pollution Source Mapping** – Visualizes fire zones, industrial clusters, and traffic corridors
• **Waterlogging Detection** – Alerts users about flooded roads with rerouting options
• **AI-Powered Forecasting** – Multi-day predictions for better preparedness
• **Multilingual & Offline Support** – Health tips in regional languages and cached AQI data for rural areas
• **Progressive Web App Ready** – Mobile-first design with plans for Flutter-based native app

**Demo Video:** https://www.youtube.com/watch?v=Sb3SMGgRnZ4&themeRefresh=1
**MVP:** https://maveriq-air.vercel.app/

**Role:** Full-Stack Developer
**Hackathon:** Ideatex – Bone Meal | Team Interstellar Maverick`,
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Data Visualization", color: "green-text-gradient" },
      { name: "Machine Learning", color: "pink-text-gradient" },
      { name: "Data Integration", color: "orange-text-gradient" },
      { name: "Web Development", color: "blue-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/059669/FFFFFF?text=MaveriqAir",
    source_code_link: "https://github.com/mahad2810/MaveriqAir",
    live_demo_link: "https://maveriq-air.vercel.app/",
    demo_video: "https://www.youtube.com/watch?v=Sb3SMGgRnZ4&themeRefresh=1",
    category: "ai",
    pdf_file: MaveriqAirProject,
    type: "pdf"
  },
  {
    name: "🧬 Lung Cancer Prediction – Data Analysis & Dashboard",
    description: "Performed an end-to-end data analysis project using the Lung Cancer Prediction dataset to identify high-risk individuals and uncover factors influencing lung cancer prevalence and survival rates.",
    fullDescription: `Performed an end-to-end data analysis project using the Lung Cancer Prediction dataset to identify high-risk individuals and uncover factors influencing lung cancer prevalence and survival rates.

**Key Highlights:**
• **Data Preprocessing:** Removed duplicates, handled missing values, standardized categorical fields, and mapped boolean attributes for analysis
• **Statistical Analysis & Insights:** Identified correlations between smoking, air pollution, and lung cancer risk; highlighted demographic and environmental factors
• **SQL Analytics:** Wrote queries from basic to advanced level in PostgreSQL for cohort analysis, prevalence trends, and survival rate segmentation
• **Dashboarding:** Designed interactive dashboards in Power BI to visualize prevalence rates, mortality trends, and country-wise patterns for actionable insights
• **Business Recommendations:** Proposed early detection strategies, smoking cessation programs, and environmental health initiatives for healthcare improvement

**Role:** Data Analyst & Dashboard Developer`,
    tags: [
      { name: "Microsoft Power BI", color: "blue-text-gradient" },
      { name: "SQL", color: "green-text-gradient" },
      { name: "Data Analysis", color: "pink-text-gradient" },
      { name: "PostgreSQL", color: "orange-text-gradient" },
      { name: "Statistical Analysis", color: "blue-text-gradient" }
    ],
    image: "https://via.placeholder.com/400x300/0891B2/FFFFFF?text=Lung+Cancer+Analysis",
    source_code_link: "#",
    category: "data",
    pdf_file: DAProject,
    type: "pdf"
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
    source_code_link: "https://github.com/mahad2810/RestApi-Project",
    category: "fullstack",
    pdf_file: Trade2AlgoProject,
    type: "pdf"
  }
];

export { technologies, experiences, projects };
