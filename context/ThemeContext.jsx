import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = {
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      cardBackground: '#333333',
      tint: '#FFFFFF',
    },
    light: {
      background: '#FFFFFF',
      text: '#000000',
      cardBackground: '#F0F0F0',
      tint: '#000000',
    },
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      theme: isDarkMode ? theme.dark : theme.light,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};