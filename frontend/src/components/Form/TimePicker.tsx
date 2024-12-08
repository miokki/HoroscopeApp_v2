import React from 'react';
import { motion } from 'framer-motion';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-2"
    >
      <label className="block text-lg font-medium">
        Godzina urodzenia
      </label>
      <input
        type="time"
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
      <p className="text-sm text-purple-300/70">
        Format 24-godzinny (np. 14:30)
      </p>
    </motion.div>
  );
};