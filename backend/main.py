import json
import requests
import datetime
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
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
async def read_root():
    
    return {"Hello": "World"}


@app.get("/weather/{longitude},{latitude}")
def read_weather(longitude: float, latitude: float):
    today = datetime.datetime.now()
    today_s_date: str = today.strftime("%Y-%m-%d")
    file_name: str = f"{today_s_date}_{longitude}_{latitude}.json"
    base_url: str = f"https://api.weather.gov/points/{longitude},{latitude}"
    
    if Path(file_name).is_file():
        with open(file_name) as f:
            data = json.load(f)
            return data

    response = requests.get(base_url)
    data = response.json()
    with open(file_name, "w") as f:
        json.dump(data, f)

    return data
