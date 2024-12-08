import React from 'react';
import { ZODIAC_SIGNS } from '../../constants/chartConstants';

interface ZodiacCircleProps {
  size: number;
}

export const ZodiacCircle: React.FC<ZodiacCircleProps> = ({ size }) => {
  const radius = size * 0.45;
  return (
    <g>
      {/* Outer ring */}
      <circle
        r={radius}
        fill="none"
        stroke="#4a5568"
        strokeWidth="2"
        className="opacity-30"
      />
      {ZODIAC_SIGNS.map((sign, index) => {
        const angle = (index * 30) - 90;
        const rad = (angle * Math.PI) / 180;
        return (
          <g key={sign} transform={`rotate(${angle})`}>
            {/* Division lines */}
            <line
              x1={radius - 40}
              x2={radius}
              y1={0}
              y2={0}
              stroke="#4a5568"
              strokeWidth="1"
              className="opacity-50"
            />
            {/* Sign names */}
            <text
              x={radius + 20}
              y={0}
              textAnchor="start"
              fill="#e2e8f0"
              fontSize={16}
              transform={`rotate(${-angle} ${radius + 20} 0)`}
              className="font-medium"
            >
              {sign}
            </text>
          </g>
        );
      })}
    </g>
  );
};