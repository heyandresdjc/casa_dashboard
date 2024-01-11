import os
import psutil
from fastapi import FastAPI
from geopy.geocoders import Nominatim
from fastapi.middleware.cors import CORSMiddleware

from .utils import get_active_processes, mem_transform
from .models.configuration import Configuration
from .services.configuration import get_configuration, set_configuration
from .services.weather import get_root_weather_data, get_hourly_weather_data


CONFIG_FILE = os.getenv('CONFIG_FILE', 'config.json')


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


@app.get("/config")
def read_root():
    return get_configuration(CONFIG_FILE)


@app.post("/config")
def post_root(config: Configuration):
    parse_config = config.model_dump()
    return set_configuration(CONFIG_FILE, parse_config)


@app.get("/weather/{longitude},{latitude}")
def read_weather(longitude: str, latitude: str):
    data = get_root_weather_data(longitude, latitude)
    return data


@app.get("/weather/{longitude},{latitude}/hourly")
def read_weather(longitude: str, latitude: str):
    data = get_hourly_weather_data(longitude, latitude)
    return data


@app.get("/weather/location/{location}")
def get_longitude_and_latitude(location: str):
    geolocator = Nominatim(user_agent="casa_dashboard")
    location = geolocator.geocode(location)
    return {
        "longitude": location.longitude,
        "latitude": location.latitude
    }


@app.get("/status")
def get_system_stats():
    """Return a list of all running processes on the machine."""

    return {
        "memory": {
            "total": mem_transform(psutil.virtual_memory()[0]),
            "available": mem_transform(psutil.virtual_memory()[1]),
            "percent": psutil.virtual_memory()[2],
            "used": mem_transform(psutil.virtual_memory()[3]),
            "free": mem_transform(psutil.virtual_memory()[4]),
            "active": mem_transform(psutil.virtual_memory()[5]),
            "inactive": mem_transform(psutil.virtual_memory()[6]),
            "buffers": mem_transform(psutil.virtual_memory()[7]),
        },
        "network": {
            "data_sent": mem_transform(psutil.net_io_counters()[0]),
            "data_recv": mem_transform(psutil.net_io_counters()[1]),
            "packets_sent": psutil.net_io_counters()[2],
            "packets_recv": psutil.net_io_counters()[3],
            "errin": psutil.net_io_counters()[4],
            "errout": psutil.net_io_counters()[5],
            "dropin": psutil.net_io_counters()[6],
            "dropout": psutil.net_io_counters()[7],
            # "stats": psutil.net_if_stats(),
            # "connections": psutil.net_connections(),
            # "ifaces": psutil.net_if_addrs()
        },
        "cpu_times_percent": psutil.cpu_times_percent(),
        "process_count": sum([1 for _ in psutil.pids()]),
        "swap": {
            "total": mem_transform(psutil.swap_memory()[0]),
            "used": mem_transform(psutil.swap_memory()[1]),
            "free": mem_transform(psutil.swap_memory()[2]),
            "percent": psutil.swap_memory()[3],
            "sin": mem_transform(psutil.swap_memory()[4]),
            "sout": mem_transform(psutil.swap_memory()[5]),
        },
        "cpu_stats": psutil.cpu_stats(),
        "boot_time": psutil.boot_time(),
        "cpu_count": psutil.cpu_count(),
        "cpu_time": psutil.cpu_times(percpu=True),
        "cpu_usage": psutil.cpu_percent(percpu=True),
        "disk": psutil.disk_partitions(),
        "active_processes": get_active_processes()
    }
