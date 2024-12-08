from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import pytz
from datetime import datetime
from typing import Optional, Dict

class GeocodingService:
    def __init__(self):
        self.geolocator = Nominatim(user_agent="horoscope_app")

    def get_coordinates(self, location: str) -> Optional[Dict[str, float]]:
        """
        Konwertuje nazwę lokalizacji na współrzędne geograficzne.
        
        Args:
            location: Nazwa miejsca (np. "Warszawa, Polska")
            
        Returns:
            Dict z szerokością i długością geograficzną lub None w przypadku błędu
        """
        try:
            location_data = self.geolocator.geocode(location)
            if location_data:
                return {
                    'latitude': location_data.latitude,
                    'longitude': location_data.longitude
                }
            return None
        except GeocoderTimedOut:
            raise Exception("Timeout podczas geokodowania lokalizacji")

    def get_timezone(self, latitude: float, longitude: float, date: datetime) -> str:
        """
        Określa strefę czasową dla danych współrzędnych i daty.
        
        Args:
            latitude: Szerokość geograficzna
            longitude: Długość geograficzna
            date: Data i czas
            
        Returns:
            Nazwa strefy czasowej
        """
        try:
            from timezonefinder import TimezoneFinder
            tf = TimezoneFinder()
            timezone_str = tf.timezone_at(lat=latitude, lng=longitude)
            if timezone_str:
                timezone = pytz.timezone(timezone_str)
                return timezone.zone
            return 'UTC'
        except Exception:
            return 'UTC'