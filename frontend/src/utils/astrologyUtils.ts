export const calculateAspectAngle = (planet1Long: number, planet2Long: number): number => {
    let diff = Math.abs(planet1Long - planet2Long);
    if (diff > 180) {
        diff = 360 - diff;
    }
    return diff;
};

export const getZodiacSign = (longitude: number): string => {
    const signs = [
        'Baran', 'Byk', 'Bliźnięta', 'Rak',
        'Lew', 'Panna', 'Waga', 'Skorpion',
        'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby'
    ];
    const signIndex = Math.floor(longitude / 30);
    return signs[signIndex];
};

export const getPlanetSymbol = (planetName: string): string => {
    const symbols: Record<string, string> = {
        'Słońce': '☉',
        'Księżyc': '☽',
        'Merkury': '☿',
        'Wenus': '♀',
        'Mars': '♂',
        'Jowisz': '♃',
        'Saturn': '♄',
        'Uran': '♅',
        'Neptun': '♆',
        'Pluton': '♇'
    };
    return symbols[planetName] || planetName[0];
};

export const formatDegrees = (degrees: number): string => {
    const deg = Math.floor(degrees);
    const min = Math.floor((degrees - deg) * 60);
    return `${deg}°${min}'`;
};