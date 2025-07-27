import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import { About, Experience, Education, Contact, Navbar, Tech, Works, Certifications, StarsCanvas, ChatWidget, Dashboard } from "./components";
import LoadingScreen from "./components/LoadingScreen";
import { useTheme } from "./providers/ThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const { isLoading } = useTheme();
  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

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

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'education':
        return <Education />;
      case 'tech':
        return <Tech />;
      case 'projects':
        return <Works />;
      case 'certifications':
        return <Certifications />;
      case 'contact':
        return (
          <div className='relative z-0'>
            <Contact />
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div></div>}>
              <StarsCanvas />
            </Suspense>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className='dark relative z-0 bg-primary min-h-screen'>
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

          {/* Main Content */}
          <main className="relative">
            {renderSection()}
          </main>

          <ChatWidget />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
