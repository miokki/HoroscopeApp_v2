# HoroscopeApp_v2

Kompleksowa aplikacja do tworzenia horoskopów i wykresów astrologicznych z interfejsem webowym.

## Spis treści

- [Opis projektu](#opis-projektu)
- [Architektura](#architektura)
- [Wymagania](#wymagania)
- [Instalacja](#instalacja)
- [Konfiguracja](#konfiguracja)
- [Użytkowanie](#użytkowanie)
- [API](#api)
- [Testy](#testy)
- [Rozwój projektu](#rozwój-projektu)
- [Licencja](#licencja)

## Opis projektu

Aplikacja umożliwia generowanie horoskopów i wykresów astrologicznych na podstawie daty, czasu i lokalizacji. Składa się z backendu napisanego w Python/Flask oraz frontendu w React/TypeScript.

Główne funkcjonalności:
- Obliczanie pozycji planet
- Generowanie wykresów horoskopu
- Geokodowanie lokalizacji
- Interaktywny interfejs użytkownika

## Architektura

### Backend (Python/Flask)
- `app.py` - główna aplikacja Flask
- `services/` - logika biznesowa
  - `calculation_service.py` - obliczenia astrologiczne
  - `geocoding_service.py` - geokodowanie lokalizacji
  - `validation_service.py` - walidacja danych wejściowych
- `models/` - modele danych
  - `horoscope.py` - model horoskopu
  - `planet.py` - model planety
  - `aspect.py` - model aspektu
- `ephe/` - pliki efemeryd
- `tests/` - testy jednostkowe
- `config.py` - konfiguracja aplikacji

### Frontend (React/TypeScript)
- `src/components/` - komponenty React
- `src/services/` - komunikacja z API
- `src/styles/` - style CSS
- `src/types/` - definicje typów TypeScript
- `src/utils/` - funkcje pomocnicze
- `src/hooks/` - custom React hooks
- `src/constants/` - stałe aplikacji

## Wymagania

### Backend
- Python 3.x
- Flask
- Swiss Ephemeris
- Inne zależności z `requirements.txt`
- Geopy >= 2.4.0
- PySwissEph >= 2.0.0
- Python-dotenv >= 1.0.0

### Frontend
- Node.js 
- React 
- TypeScript
- Zależności z `package.json`
- Material-UI >= 5.0.0
- Axios >= 1.0.0
- React Router >= 6.0.0

## Instalacja

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

## Konfiguracja

### Backend
1. Pobierz pliki efemeryd ze strony [Swiss Ephemeris](https://www.astro.com/ftp/swisseph/ephe/)
2. Umieść pliki `.se1` w katalogu `ephe` znajdującym się w głównym katalogu backendu:
   ```
   backend/ephe/
   ```
3. Skonfiguruj zmienne środowiskowe:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   ```

### Frontend
1. Utwórz plik `.env` w katalogu frontend:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

## Użytkowanie

1. Uruchom backend:
```bash
cd backend
flask run
```

2. Uruchom frontend:
```bash
cd frontend
npm start
```

3. Otwórz http://localhost:3000 w przeglądarce

## API

### Endpoint: /api/horoscope

**POST** `/api/horoscope`

Parametry żądania:
```json
{
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "location": "Nazwa miejscowości"
}
```

Przykładowa odpowiedź:
```json
{
  "planets": [...],
  "houses": [...],
  "aspects": [...]
}
```

### Endpointy

#### GET `/api/health`
Sprawdzenie stanu aplikacji.

Odpowiedź:
```json
{
  "status": "ok"
}
```

## Testy

### Backend
1. Uruchom testy jednostkowe:
```bash
cd backend
pytest
```

### Frontend
1. Uruchom testy jednostkowe:
```bash
cd frontend
npm test
```

## Rozwój projektu

### Struktura kodu
- Używaj typów dla wszystkich funkcji
- Dokumentuj kod używając docstringów
- Stosuj testy jednostkowe

### Kontrybucje
1. Utwórz fork repozytorium
2. Stwórz branch dla nowej funkcjonalności
3. Wyślij Pull Request

## Licencja

Ten projekt jest licencjonowany na warunkach [MIT License](LICENSE).

---

W razie pytań lub problemów, utwórz Issue w repozytorium projektu.