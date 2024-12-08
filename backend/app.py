from flask import Flask, request, jsonify
from flask_cors import CORS
from services.calculation_service import CalculationService
from services.geocoding_service import GeocodingService
from models.horoscope_model import HoroscopeModel
import os
import traceback
import sys

app = Flask(__name__)
CORS(app)

# Inicjalizacja serwisów
calculation_service = CalculationService()
geocoding_service = GeocodingService()

@app.route('/api/horoscope', methods=['POST'])
def calculate_horoscope():
    try:
        data = request.get_json()
        print("Otrzymane dane:", data)  # Debug log
        
        # Walidacja danych wejściowych
        if not all(key in data for key in ['date', 'time', 'location']):
            return jsonify({'error': 'Brak wymaganych danych'}), 400

        # Geokodowanie lokalizacji
        coordinates = geocoding_service.get_coordinates(data['location'])
        print("Współrzędne:", coordinates)  # Debug log
        if not coordinates:
            return jsonify({'error': 'Nie można znaleźć lokalizacji'}), 400

        # Obliczanie horoskopu
        horoscope = calculation_service.calculate_horoscope(
            date=data['date'],
            time=data['time'],
            latitude=coordinates['latitude'],
            longitude=coordinates['longitude']
        )
        print("Obliczony horoskop:", horoscope)  # Debug log

        return jsonify(horoscope)

    except Exception as e:
        # Szczegółowe logowanie błędu
        print("Błąd:", str(e))
        print("Szczegóły błędu:", traceback.format_exc())
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)