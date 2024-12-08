def normalize_angle(angle: float) -> float:
    """
    Normalizuje kąt do zakresu 0-360 stopni.
    """
    return angle % 360

def get_sign_name(longitude: float) -> str:
    """
    Zwraca nazwę znaku zodiaku dla danej długości ekliptycznej.
    """
    signs = [
        'Baran', 'Byk', 'Bliźnięta', 'Rak',
        'Lew', 'Panna', 'Waga', 'Skorpion',
        'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby'
    ]
    sign_num = int(normalize_angle(longitude) / 30)
    return signs[sign_num]

def get_aspect_name(angle: float) -> str:
    """
    Zwraca nazwę aspektu dla danego kąta.
    """
    aspects = {
        0: 'Koniunkcja',
        60: 'Sekstyl',
        90: 'Kwadratura',
        120: 'Trygon',
        180: 'Opozycja'
    }
    return aspects.get(angle, 'Nieznany aspekt')