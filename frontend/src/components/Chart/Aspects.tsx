import React from 'react';
import { Planet } from '../../types/astrologyTypes';

interface AspectsProps {
  aspects: Array<{
    planet1: string;
    planet2: string;
    angle: number;
    type: string;
  }>;
  planets: Record<string, Planet>;
  size: number;
}

export const Aspects: React.FC<AspectsProps> = ({ aspects, planets, size }) => {
  const radius = size * 0.35;
  
  const getAspectColor = (type: string): string => {
    switch (type) {
      case 'CONJUNCTION': return '#FFD700';
      case 'SEXTILE': return '#98FB98';
      case 'SQUARE': return '#FF4500';
      case 'TRINE': return '#4169E1';
      case 'OPPOSITION': return '#FF1493';
      default: return '#ffffff';
    }
  };

  const calculatePosition = (longitude: number) => {
    const angle = (longitude - 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  return (
    <>
      {aspects.map((aspect, index) => {
        const pos1 = calculatePosition(planets[aspect.planet1].longitude);
        const pos2 = calculatePosition(planets[aspect.planet2].longitude);

        return (
          <line
            key={index}
            x1={pos1.x} y1={pos1.y}
            x2={pos2.x} y2={pos2.y}
            stroke={getAspectColor(aspect.type)}
            strokeWidth="1"
            opacity="0.5"
            strokeDasharray={aspect.type === 'OPPOSITION' ? '5,5' : undefined}
          />
        );
      })}
    </>
  );
};