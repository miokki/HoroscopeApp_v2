export interface BirthData {
  date: string;
  time: string;
  location: string;
}

export interface Planet {
  longitude: number;
  latitude: number;
  speed: number;
  house: number;
  sign: string;
  retrograde: boolean;
}

export interface House {
  cusp: number;
  sign: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  angle: number;
  type: string;
  orb: number;
}

export interface HoroscopeData {
  planets: Record<string, Planet>;
  houses: Record<string, House>;
  aspects: Array<{
    planet1: string;
    planet2: string;
    angle: number;
    type: string;
  }>;
  moon_phase: number;
}