import json
import requests
import datetime
from pathlib import Path
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
async def read_root():
    
    return {"Hello": "World"}


@app.get("/weather/{longitude},{latitude}")
def read_item(longitude: float, latitude: float):
    today = datetime.datetime.now()
    today_s_date = today.strftime("%Y-%m-%d")
    file_name: str = f"{today_s_date}_{longitude}_{latitude}.json"
    
    if Path(file_name).is_file():
        with open(file_name) as f:
            data = json.load(f)
            return data
    
    base_url = f"https://api.weather.gov/points/{longitude},{latitude}"
    response = requests.get(base_url)
    data = response.json()
    with open(file_name, "w") as f:
        json.dump(data, f)
    return {
        "longitude": longitude,
        "latitude": latitude,
        "url": base_url,
        "file_name": file_name
    }
