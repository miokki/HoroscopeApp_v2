import React, { useState, useEffect } from 'react';
import { LocationInput } from './LocationInput';

interface FormData {
  date: string;
  time: string;
  location: string;
}

export const HoroscopeForm: React.FC<{ onDataReceived: (data: any) => void }> = ({ onDataReceived }) => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    time: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onDataReceived(data);
    } catch (error) {
      console.error('Błąd:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-2">
        Odkryj swoją mapę astrologiczną
      </h1>
      <p className="text-lg text-center text-gray-300 mb-8">
        Wprowadź dane urodzenia, aby rozpocząć podróż
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-white">
              Data urodzenia
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 border-2 border-purple-500/30 rounded-lg shadow-inner text-white text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium text-white">
              Godzina urodzenia
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 border-2 border-purple-500/30 rounded-lg shadow-inner text-white text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              required
            />
            <p className="text-sm text-purple-300">
              Format 24-godzinny (np. 14:30)
            </p>
          </div>
        </div>

        <LocationInput
          value={formData.location}
          onChange={(location) => setFormData({ ...formData, location })}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generowanie...' : 'Generuj horoskop'}
        </button>
      </form>
    </div>
  );
};