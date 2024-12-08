import React from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full backdrop-blur-lg bg-white/10 shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
  );
};