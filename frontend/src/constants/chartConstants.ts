export const ZODIAC_SIGNS = [
    'Baran', 'Byk', 'Bliźnięta', 'Rak',
    'Lew', 'Panna', 'Waga', 'Skorpion',
    'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby'
  ] as const;
  
  export const PLANETS = [
    'Słońce', 'Księżyc', 'Merkury', 'Wenus', 'Mars',
    'Jowisz', 'Saturn', 'Uran', 'Neptun', 'Pluton'
  ] as const;
  
  export const ASPECT_TYPES = {
    CONJUNCTION: { angle: 0, orb: 8, name: 'Koniunkcja' },
    SEXTILE: { angle: 60, orb: 6, name: 'Sekstyl' },
    SQUARE: { angle: 90, orb: 8, name: 'Kwadratura' },
    TRINE: { angle: 120, orb: 8, name: 'Trygon' },
    OPPOSITION: { angle: 180, orb: 8, name: 'Opozycja' }
  } as const;