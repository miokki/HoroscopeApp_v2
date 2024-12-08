import React from 'react';
import { motion } from 'framer-motion';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-2"
    >
      <label className="block text-lg font-medium">
        Data urodzenia
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg 
                   bg-opacity-10 backdrop-blur-lg
                   border border-purple-300/20
                   focus:ring-2 focus:ring-purple-500
                   focus:border-transparent
                   dark:text-white
                   transition duration-200"
        required
      />
    </motion.div>
  );
};