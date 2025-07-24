import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply theme to document
    const applyTheme = (dark) => {
      if (dark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = '#050816';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = '#f8fafc';
      }
    };

    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Mark app as loaded to hide loading spinner
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('app-loaded');
    }, 100);

    return () => clearTimeout(timer);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const value = {
    isDark,
    toggleTheme,
    isLoading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
