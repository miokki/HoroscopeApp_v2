import swisseph as swe
from datetime import datetime
import pytz
from typing import Dict, List, Tuple, Optional
from models.horoscope_model import HoroscopeModel, Planet, House, Aspect
from flask import Flask, request, jsonify
import os

class CalculationService:
    def __init__(self):
        # Inicjalizacja Swiss Ephemeris
        ephe_path = os.path.join(os.path.dirname(__file__), '..', 'ephe')
        if not os.path.exists(ephe_path):
            os.makedirs(ephe_path)
        swe.set_ephe_path(ephe_path)
        
        # Sprawdzenie, czy pliki efemeryd są dostępne
        required_files = ['sepl_18.se1', 'semo_18.se1', 'seas_18.se1']
        missing_files = [f for f in required_files if not os.path.exists(os.path.join(ephe_path, f))]
        if missing_files:
            print(f"UWAGA: Brakujące pliki efemeryd: {missing_files}")
            print(f"Proszę pobrać pliki ze strony: https://www.astro.com/ftp/swisseph/ephe/")
        
        self.PLANETS = {
            'Sun': swe.SUN,
            'Moon': swe.MOON,
            'Mercury': swe.MERCURY,
            'Venus': swe.VENUS,
            'Mars': swe.MARS,
            'Jupiter': swe.JUPITER,
            'Saturn': swe.SATURN,
            'Uranus': swe.URANUS,
            'Neptune': swe.NEPTUNE,
            'Pluto': swe.PLUTO
        }
        
        self.SIGNS = [
            'Baran', 'Byk', 'Bliźnięta', 'Rak',
            'Lew', 'Panna', 'Waga', 'Skorpion',
            'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby'
        ]

    def calculate_horoscope(self, date: str, time: str, latitude: float, longitude: float) -> Dict:
        """
        Oblicza pełny horoskop dla podanych danych.
        
        Args:
            date: Data w formacie 'YYYY-MM-DD'
            time: Czas w formacie 'HH:MM'
            latitude: Szerokość geograficzna
            longitude: Długość geograficzna
            
        Returns:
            Słownik z danymi horoskopu
            
        Raises:
            Exception: W przypadku błędu podczas obliczeń
        """
        try:
            # Konwersja daty i czasu na Julian Day
            dt = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
            julian_day = self._datetime_to_jd(dt)

            # Obliczenia
            planets = self._calculate_planets(julian_day)
            houses = self._calculate_houses(julian_day, latitude, longitude)
            self._assign_planets_to_houses(planets, houses)  # Dodane przypisanie planet do domów
            aspects = self._calculate_aspects(planets)
            moon_phase = self._calculate_moon_phase(julian_day)

            # Tworzenie modelu horoskopu
            horoscope = HoroscopeModel(
                planets=planets,
                houses=houses,
                aspects=aspects,
                moon_phase=moon_phase
            )

            return horoscope.to_dict()
        except ValueError as e:
            print(f"Błąd walidacji danych wejściowych: {str(e)}")
            raise
        except Exception as e:
            print(f"Błąd podczas obliczania horoskopu: {str(e)}")
            raise

    def _datetime_to_jd(self, dt: datetime) -> float:
        """Konwertuje datetime na Julian Day"""
        return swe.julday(dt.year, dt.month, dt.day,
                         dt.hour + dt.minute/60.0)

    def _calculate_planets(self, julian_day: float) -> Dict[str, Planet]:
        """Oblicza pozycje planet"""
        planets = {}
        for name, planet_id in self.PLANETS.items():
            try:
                # Dodajemy flagi dla dodatkowych informacji
                flags = swe.FLG_SPEED | swe.FLG_RADIANS
                result = swe.calc_ut(julian_day, planet_id, flags)
                
                if not result or len(result[0]) < 6:
                    raise ValueError(f"Niepełne dane dla planety {name}")
                    
                # W wyniku otrzymujemy krotkę z listą współrzędnych i flagami
                coords, retflags = result
                
                # Rozpakowanie wartości (w radianach)
                longitude = coords[0] * 180.0 / 3.14159  # konwersja na stopnie
                latitude = coords[1] * 180.0 / 3.14159
                distance = coords[2]
                speed_long = coords[3] * 180.0 / 3.14159
                
                # Określenie znaku zodiaku
                sign_num = int(longitude // 30) % 12
                sign = self.SIGNS[sign_num]
                
                planets[name] = Planet(
                    longitude=longitude,
                    latitude=latitude,
                    speed=speed_long,
                    house=0,  # Dom zostanie uzupełniony później
                    sign=sign,
                    retrograde=speed_long < 0
                )
                
            except Exception as e:
                print(f"Błąd podczas obliczania pozycji planety {name}: {str(e)}")
                continue  # Pomijamy planetę w przypadku błędu zamiast używać wartości domyślnych
        
        return planets

    def _calculate_houses(self, julian_day: float, latitude: float, longitude: float) -> Dict[int, House]:
        """
        Oblicza pozycje domów astrologicznych używając systemu Placidusa.
        
        Args:
            julian_day: Czas w formacie Julian Day
            latitude: Szerokość geograficzna
            longitude: Długość geograficzna
            
        Returns:
            Słownik z obiektami House dla każdego z 12 domów
        """
        houses = {}
        
        # Obliczanie cuspów domów
        cusps = swe.houses(julian_day, latitude, longitude)[0]
        
        # Tworzenie obiektów House dla każdego domu
        for house_num in range(1, 13):
            cusp = cusps[house_num - 1]
            sign_num = int(cusp / 30)
            
            houses[house_num] = House(
                cusp=cusp,
                sign=self.SIGNS[sign_num]
            )
        
        return houses

    def _calculate_aspects(self, planets: Dict[str, Planet]) -> List[Aspect]:
        """
        Oblicza aspekty między planetami.
        
        Args:
            planets: Słownik z pozycjami planet
            
        Returns:
            Lista aspektów między planetami
        """
        aspects = []
        
        # Definicje aspektów (kąt i dozwolone odchylenie/orb)
        ASPECT_DEFINITIONS = {
            'CONJUNCTION': {'angle': 0, 'orb': 8},
            'SEXTILE': {'angle': 60, 'orb': 6},
            'SQUARE': {'angle': 90, 'orb': 8},
            'TRINE': {'angle': 120, 'orb': 8},
            'OPPOSITION': {'angle': 180, 'orb': 8}
        }
        
        # Sprawdzanie każdej pary planet
        planet_names = list(planets.keys())
        for i in range(len(planet_names)):
            for j in range(i + 1, len(planet_names)):
                planet1 = planets[planet_names[i]]
                planet2 = planets[planet_names[j]]
                
                # Obliczanie różnicy kątowej między planetami
                diff = abs(planet1.longitude - planet2.longitude)
                if diff > 180:
                    diff = 360 - diff
                
                # Sprawdzanie każdego możliwego aspektu
                for aspect_type, definition in ASPECT_DEFINITIONS.items():
                    orb = abs(diff - definition['angle'])
                    if orb <= definition['orb']:
                        aspects.append(Aspect(
                            planet1=planet_names[i],
                            planet2=planet_names[j],
                            angle=diff,
                            type=aspect_type,
                            orb=orb
                        ))
        
        return aspects

    def _calculate_moon_phase(self, julian_day: float) -> float:
        """Oblicza fazę Księżyca"""
        try:
            sun_result = swe.calc_ut(julian_day, swe.SUN)
            moon_result = swe.calc_ut(julian_day, swe.MOON)
            
            if sun_result is None or moon_result is None:
                return 0.0
                
            sun_pos = sun_result[0]  # Pierwsza wartość to długość ekliptyczna
            moon_pos = moon_result[0]
            
            phase = (moon_pos - sun_pos) % 360
            return phase / 360.0
            
        except Exception as e:
            print(f"Błąd podczas obliczania fazy Księżyca: {str(e)}")
            return 0.0

    def _assign_planets_to_houses(self, planets: Dict[str, Planet], houses: Dict[int, House]):
        """
        Przypisuje planety do odpowiednich domów.
        
        Args:
            planets: Słownik z planetami
            houses: Słownik z domami
        """
        house_cusps = [house.cusp for house in houses.values()]
        
        for planet in planets.values():
            # Znajdź odpowiedni dom dla planety
            for house_num in range(1, 13):
                next_house = (house_num % 12) + 1
                
                start = houses[house_num].cusp
                end = houses[next_house].cusp
                
                if end < start:  # Przekroczenie 360 stopni
                    if planet.longitude >= start or planet.longitude < end:
                        planet.house = house_num
                        break
                else:
                    if start <= planet.longitude < end:
                        planet.house = house_num
                        break

app = Flask(__name__)
calculation_service = CalculationService()

@app.route('/api/horoscope', methods=['POST'])
def calculate_horoscope():
    try:
        data = request.get_json()
        print("Otrzymane dane:", data)  # Debug log
        
        date = data['date']
        time = data['time']
        latitude = data['latitude']
        longitude = data['longitude']
        
        result = calculation_service.calculate_horoscope(date, time, latitude, longitude)
        print("Wysyłane dane:", result)  # Debug log
        return jsonify(result)
    except Exception as e:
        print("Błąd:", str(e))  # Debug log
        return jsonify({'error': str(e)}), 500