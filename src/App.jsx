import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { About, Experience, Education, Cards, Contact, Hero, Navbar, Tech, Works, Certifications, StarsCanvas, ChatWidget } from "./components";
import LoadingScreen from "./components/LoadingScreen";
import { useTheme } from "./providers/ThemeProvider";

const App = () => {
  const { isLoading } = useTheme();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a brief delay to ensure smooth transition
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !showContent) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-light-primary dark:bg-primary transition-colors duration-300'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Education />
        <Tech />
        <Cards />
        <Works />
        <Certifications />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
