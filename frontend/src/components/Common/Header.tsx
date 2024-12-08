import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-astral-gold mb-4 tracking-wider">
          HoroscopeApp
        </h1>
        <p className="text-xl text-center text-astral-silver italic">
          ✧ Odkryj tajemnice swojej mapy astrologicznej ✧
        </p>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-astral-gold to-transparent"></div>
      </div>
    </header>
  );
};