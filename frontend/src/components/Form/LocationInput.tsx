// components/Form/LocationInput.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedValue = useDebounce(value, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Zamykanie listy sugestii po kliknięciu poza komponentem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pobieranie sugestii
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedValue || debouncedValue.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedValue)}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue]);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
        Miejsce urodzenia
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="np. Warszawa, Polska"
        className="w-full px-4 py-2 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600
                  rounded-lg focus:ring-2 focus:ring-purple-500"
        required
      />

      {/* Lista sugestii */}
      {showSuggestions && (debouncedValue.length >= 3) && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="px-4 py-3 text-gray-600 dark:text-gray-300">
              Wyszukiwanie...
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="px-4 py-3 cursor-pointer 
                           hover:bg-gray-100 dark:hover:bg-gray-600
                           text-gray-900 dark:text-white"
                  onClick={() => {
                    onChange(suggestion.display_name);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-gray-600 dark:text-gray-300">
              Brak wyników
            </div>
          )}
        </div>
      )}
    </div>
  );
};