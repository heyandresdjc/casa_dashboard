import socket
import platform
from .models import WeatherDataRootFeature, Forecast
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from .services.weather import get_root_weather_data, get_hourly_weather_data


app = FastAPI()


origins = [
    "http://localhost",
    "http://0.0.0.0",
    "http://localhost:8000",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_node_ip_address(hostname):
    ip = None
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip = s.getsockname()[0]
    s.close()
    return ip


@app.get("/")
def read_root():
    
    # distribution
    # dist = platform.dist()
    # dist = " ".join(x for x in dist)

    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    
    print(f"Hostname: {hostname}") 
    print(f"IP Address: {ip_address}")
    
    return {
        "architecture": platform.architecture()[0],
        "machine": platform.machine(),
        "node": platform.node(),
        "system": platform.system(),
        "ip_address": get_node_ip_address("localhost")
    }


@app.get("/weather/{longitude},{latitude}")
def read_weather(
    longitude: str,
    latitude: str
) -> WeatherDataRootFeature:
    data = get_root_weather_data(longitude, latitude)
    return data

@app.get("/weather/{longitude},{latitude}/hourly")
def read_weather(
    longitude: str,
    latitude: str
) -> Forecast:
    data = get_hourly_weather_data(longitude, latitude)
    return data
