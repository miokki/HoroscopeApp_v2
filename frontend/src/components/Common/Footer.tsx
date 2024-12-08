import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center">
          &copy; {new Date().getFullYear()} HoroscopeApp. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
};