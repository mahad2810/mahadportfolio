import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import { About, Experience, Education, Cards, Contact, Hero, Navbar, Tech, Works, Certifications, StarsCanvas, ChatWidget } from "./components";
import LoadingScreen from "./components/LoadingScreen";
import { useTheme } from "./providers/ThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";

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
    <ErrorBoundary>
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
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div></div>}>
              <StarsCanvas />
            </Suspense>
          </div>
          <ChatWidget />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
