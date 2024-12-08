import React from 'react';
import { HoroscopeData } from '../../types/astrologyTypes';
import { ZodiacCircle } from './ZodiacCircle';
import { Houses } from './Houses';
import { Planets } from './Planets';
import { Aspects } from './Aspects';
import { useThemeContext } from '../../context/ThemeContext';

interface HoroscopeChartProps {
  data: HoroscopeData;
}

export const HoroscopeChart: React.FC<HoroscopeChartProps> = ({ data }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const chartSize = 800;
  const centerX = chartSize / 2;
  const centerY = chartSize / 2;
  const { theme } = useThemeContext();

  // Użyj zmiennych CSS w stylach SVG
  const chartStyles = {
    lines: {
      stroke: 'var(--chart-lines)',
      strokeWidth: 1,
    },
    background: {
      fill: 'var(--chart-background)',
    }
  };

  React.useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">
      <span className="text-lg">Ładowanie wykresu...</span>
    </div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 rounded-3xl bg-navy-900 backdrop-blur-lg shadow-2xl">
      <svg 
        viewBox={`0 0 ${chartSize} ${chartSize}`} 
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="zodiacRing" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#1a1f35" />
            <stop offset="50%" stopColor="#2a3152" />
            <stop offset="100%" stopColor="#1a1f35" />
          </linearGradient>
          
          {/* Filters */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g transform={`translate(${centerX}, ${centerY})`}>
          {/* Background */}
          <circle r="390" fill="url(#zodiacRing)" />
          
          {/* Components */}
          <ZodiacCircle size={chartSize} />
          <Houses houses={data.houses} size={chartSize} />
          <Aspects aspects={data.aspects} planets={data.planets} size={chartSize} />
          <Planets planets={data.planets} size={chartSize} />
        </g>
      </svg>
    </div>
  );
};