from dataclasses import dataclass
from typing import Dict, List, Optional

@dataclass
class Planet:
    longitude: float
    latitude: float
    speed: float
    house: int
    sign: str
    retrograde: bool

@dataclass
class House:
    cusp: float
    sign: str

@dataclass
class Aspect:
    planet1: str
    planet2: str
    angle: float
    type: str
    orb: float

@dataclass
class HoroscopeModel:
    planets: Dict[str, Planet]
    houses: Dict[int, House]
    aspects: List[Aspect]
    moon_phase: float
    
    def to_dict(self):
        return {
            'planets': {
                name: {
                    'longitude': planet.longitude,
                    'latitude': planet.latitude,
                    'speed': planet.speed,
                    'house': planet.house,
                    'sign': planet.sign,
                    'retrograde': planet.retrograde
                } for name, planet in self.planets.items()
            },
            'houses': {
                str(num): {
                    'cusp': house.cusp,
                    'sign': house.sign
                } for num, house in self.houses.items()
            },
            'aspects': [
                {
                    'planet1': aspect.planet1,
                    'planet2': aspect.planet2,
                    'angle': aspect.angle,
                    'type': aspect.type,
                    'orb': aspect.orb
                } for aspect in self.aspects
            ],
            'moon_phase': self.moon_phase
        }