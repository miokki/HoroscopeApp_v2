import React from 'react';
import { House } from '../../types/astrologyTypes';

interface HousesProps {
  houses: Record<string, House>;
  size: number;
}

export const Houses: React.FC<HousesProps> = ({ houses, size }) => {
  const radius = size * 0.4;

  return (
    <>
      {Object.entries(houses).map(([houseNum, house]) => {
        const angle = house.cusp - 90;
        const radians = (angle * Math.PI) / 180;

        return (
          <g key={houseNum}>
            <line
              x1={0}
              y1={0}
              x2={radius * Math.cos(radians)}
              y2={radius * Math.sin(radians)}
              stroke="#718096"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            
            {/* Numeracja domów */}
            <text
              x={(radius - 30) * Math.cos(radians)}
              y={(radius - 30) * Math.sin(radians)}
              textAnchor="middle"
              dy=".35em"
              className="fill-current text-sm"
            >
              {houseNum}
            </text>
          </g>
        );
      })}
    </>
  );
};