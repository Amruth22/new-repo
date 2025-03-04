import React, { createContext, useState, useEffect } from 'react';

// Default theme colors
const defaultThemes = {
  light: {
    primary: '#4a6fa5',
    secondary: '#6b8cae',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#212529',
    error: '#dc3545'
  },
  dark: {
    primary: '#5d8acd',
    secondary: '#7fa1c9',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#e0e0e0',
    error: '#f44336'
  }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has previously set theme preferences
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const savedCustomTheme = JSON.parse(localStorage.getItem('customTheme'));
  
  const [darkMode, setDarkMode] = useState(savedDarkMode);
  const [customTheme, setCustomTheme] = useState(savedCustomTheme || {});
  
  // Combine default theme with custom theme
  const getTheme = () => {
    const baseTheme = darkMode ? defaultThemes.dark : defaultThemes.light;
    return { ...baseTheme, ...customTheme };
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const updateThemeColor = (colorKey, value) => {
    setCustomTheme({
      ...customTheme,
      [colorKey]: value
    });
  };
  
  const resetTheme = () => {
    setCustomTheme({});
    localStorage.removeItem('customTheme');
  };
  
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
    
    // Apply theme to document body
    document.body.style.backgroundColor = getTheme().background;
    document.body.style.color = getTheme().text;
  }, [darkMode, customTheme]);
  
  return (
    <ThemeContext.Provider 
      value={{ 
        darkMode, 
        toggleDarkMode, 
        theme: getTheme(), 
        updateThemeColor,
        resetTheme,
        defaultThemes
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};