import React from 'react';
import { Planet } from '../../types/astrologyTypes';

interface PlanetsProps {
  planets: Record<string, Planet>;
  size: number;
}

const planetColors: Record<string, string> = {
  'Sun': '#ffd700',
  'Moon': '#c0c0c0',
  'Mercury': '#87ceeb',
  'Venus': '#ff69b4',
  'Mars': '#ff4500',
  'Jupiter': '#daa520',
  'Saturn': '#a0522d',
  'Uranus': '#00ced1',
  'Neptune': '#4169e1',
  'Pluto': '#800080'
};

const planetSymbols: Record<string, string> = {
  'Sun': '☉', 'Moon': '☽', 'Mercury': '☿',
  'Venus': '♀', 'Mars': '♂', 'Jupiter': '♃',
  'Saturn': '♄', 'Uranus': '⛢', 'Neptune': '♆',
  'Pluto': '♇'
};

export const Planets: React.FC<PlanetsProps> = ({ planets, size }) => {
  return (
    <>
      {Object.entries(planets).map(([name, planet]) => {
        const angle = planet.longitude - 90;
        const rad = (angle * Math.PI) / 180;
        const r = size * 0.35;
        const x = r * Math.cos(rad);
        const y = r * Math.sin(rad);

        return (
          <g key={name} transform={`translate(${x},${y})`}>
            {/* Planet circle */}
            <circle
              r={12}
              fill={planetColors[name]}
              filter="url(#glow)"
              className="opacity-80"
            />
            
            {/* Planet symbol */}
            <text
              className="fill-current text-white font-bold text-sm"
              textAnchor="middle"
              dy=".3em"
            >
              {planetSymbols[name]}
            </text>
            
            {/* Planet name */}
            <text
              y={24}
              className="fill-current text-gray-300 text-xs"
              textAnchor="middle"
            >
              {name}
            </text>
          </g>
        );
      })}
    </>
  );
};