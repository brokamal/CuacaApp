import requests
import json
provinces = [
    "aceh", "bali", "bangka-belitung", "banten", "bengkulu", "jawa-tengah", "kalimantan-tengah", 
    "sulawesi-tengah", "jawa-timur", "kalimantan-timur", "nusa-tenggara-timur", "gorontalo", 
    "dki-jakarta", "jambi", "lampung", "maluku", "kalimantan-utara", "maluku-utara", 
    "sulawesi-utara", "sumatera-utara", "papua", "jawa-barat", "kalimantan-barat", 
    "nusa-tenggara-barat", "papua-barat", "sulawesi-barat", "sumatera-barat", "di-yogyakarta"
]

for p in provinces: 
    print(p, len(p))
    response = requests.get(f'https://cuaca-gempa-rest-api.vercel.app/weather/{p}')
    if response.status_code == 200:
        data = response.json()
        if data['success'] and 'areas' in data['data']:
            for area in data['data']['areas']:
                description = area['description']
                formatted_description = description.replace(' ', '-').lower()
                print(formatted_description)
    else:
        print(f"Failed to retrieve data for {p}, status code: {response.status_code}")
