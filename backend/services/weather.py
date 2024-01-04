import requests
import datetime
from pathlib import Path
from .cache import set_json_file_caching, get_json_file_cache


today = datetime.datetime.now()
yesterday = today - datetime.timedelta(days=1)
yesterday_string = yesterday.strftime("%Y-%m-%d")

today_s_date: str = today.strftime("%Y-%m-%d")
yesterday_s_date: str = today.strftime("%Y-%m-%d")


def clear_weather_cache(longitude, latitude):

    root_file_name: str = f"{yesterday_s_date}_{longitude}_{latitude}.json"
    if Path(root_file_name).is_file():
        Path(root_file_name).unlink()

    hourly_file_name: str = f"{yesterday_s_date}_{longitude}_{latitude}_hourly.json"
    if Path(hourly_file_name).is_file():
        Path(hourly_file_name).unlink()


def get_root_weather_data(longitude, latitude) -> dict:

    clear_weather_cache(longitude, latitude)

    file_name: str = f"{today_s_date}_{longitude}_{latitude}.json"
    base_url: str = f"https://api.weather.gov/points/{longitude},{latitude}"
    
    if Path(file_name).is_file():
        with open(file_name) as f:
            return get_json_file_cache(file_name)
    else:
        response = requests.get(base_url)
        data = response.json()
        response_cached = set_json_file_caching(file_name, data)
        return response_cached


def get_hourly_weather_data(longitude, latitude) -> dict:

    clear_weather_cache(longitude, latitude)

    file_name: str = f"{today_s_date}_{longitude}_{latitude}_hourly.json"

    if data := get_json_file_cache(file_name):
        return data
    else:
        root = get_root_weather_data(longitude, latitude)
        response = requests.get(root["properties"]["forecastHourly"])
        return set_json_file_caching(file_name, response.json())

"""
{
  "@context": [
    "https://geojson.org/geojson-ld/geojson-context.jsonld",
    {
      "@version": "1.1",
      "wx": "https://api.weather.gov/ontology#",
      "s": "https://schema.org/",
      "geo": "http://www.opengis.net/ont/geosparql#",
      "unit": "http://codes.wmo.int/common/unit/",
      "@vocab": "https://api.weather.gov/ontology#",
      "geometry": { "@id": "s:GeoCoordinates", "@type": "geo:wktLiteral" },
      "city": "s:addressLocality",
      "state": "s:addressRegion",
      "distance": { "@id": "s:Distance", "@type": "s:QuantitativeValue" },
      "bearing": { "@type": "s:QuantitativeValue" },
      "value": { "@id": "s:value" },
      "unitCode": { "@id": "s:unitCode", "@type": "@id" },
      "forecastOffice": { "@type": "@id" },
      "forecastGridData": { "@type": "@id" },
      "publicZone": { "@type": "@id" },
      "county": { "@type": "@id" }
    }
  ],
  "id": "https://api.weather.gov/points/25.9888,-80.2257",
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [-80.2257, 25.9888] },
  "properties": {
    "@id": "https://api.weather.gov/points/25.9888,-80.2257",
    "@type": "wx:Point",
    "cwa": "MFL",
    "forecastOffice": "https://api.weather.gov/offices/MFL",
    "gridId": "MFL",
    "gridX": 107,
    "gridY": 60,
    "forecast": "https://api.weather.gov/gridpoints/MFL/107,60/forecast",
    "forecastHourly": "https://api.weather.gov/gridpoints/MFL/107,60/forecast/hourly",
    "forecastGridData": "https://api.weather.gov/gridpoints/MFL/107,60",
    "observationStations": "https://api.weather.gov/gridpoints/MFL/107,60/stations",
    "relativeLocation": {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-80.18101, 25.978672] },
      "properties": {
        "city": "West Park",
        "state": "FL",
        "distance": { "unitCode": "wmoUnit:m", "value": 4606.7781032559 },
        "bearing": { "unitCode": "wmoUnit:degree_(angle)", "value": 284 }
      }
    },
    "forecastZone": "https://api.weather.gov/zones/forecast/FLZ072",
    "county": "https://api.weather.gov/zones/county/FLC011",
    "fireWeatherZone": "https://api.weather.gov/zones/fire/FLZ072",
    "timeZone": "America/New_York",
    "radarStation": "KAMX"
  }
}

"""