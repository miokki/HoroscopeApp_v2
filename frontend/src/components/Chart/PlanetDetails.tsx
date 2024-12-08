import React from 'react';
import { Planet } from '../../types/astrologyTypes';
import { motion } from 'framer-motion';

interface PlanetDetailsProps {
  planet: Planet;
  name: string;
  onClose: () => void;
}

export const PlanetDetails: React.FC<PlanetDetailsProps> = ({ planet, name, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-2">
        <p>
          <span className="text-gray-300">Znak: </span>
          <span className="font-medium">{planet.sign}</span>
        </p>
        <p>
          <span className="text-gray-300">Dom: </span>
          <span className="font-medium">{planet.house}</span>
        </p>
        <p>
          <span className="text-gray-300">Długość: </span>
          <span className="font-medium">{planet.longitude.toFixed(2)}°</span>
        </p>
        {planet.retrograde && (
          <p className="text-orange-400">
            Retrogradacja
          </p>
        )}
      </div>
    </motion.div>
  );
};