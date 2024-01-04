from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from services.weather import get_root_weather_data, get_hourly_weather_data


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


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/weather/{longitude},{latitude}")
def read_weather(longitude: str, latitude: str):
    data = get_root_weather_data(longitude, latitude)
    return data

@app.get("/weather/{longitude},{latitude}/hourly")
def read_weather(longitude: str, latitude: str):
    data = get_hourly_weather_data(longitude, latitude)
    return data
