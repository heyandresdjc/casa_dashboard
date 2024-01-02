from pydantic import BaseModel
from datetime import datetime


class RelativeLocation(BaseModel):
    type: str = "Feature"
    geometry: dict
    properties: dict


class Properties(BaseModel):
    cwa: str
    forecastOffice: str 
    gridId: str
    gridX: int
    gridY: int
    forecast: str
    forecastHourly: str
    forecastGridData: str
    observationStations: str
    relativeLocation: RelativeLocation
    forecastZone: str
    county: str 
    fireWeatherZone: str
    timeZone: str
    radarStation: str


class Geometry(BaseModel):
    type: str = "Point"
    coordinates: list


class Feature(BaseModel):
    type: str = "Feature"
    geometry: Geometry
    properties: Properties


class Period(BaseModel):
    number: int
    name: str
    startTime: datetime
    endTime: datetime
    isDaytime: bool
    temperature: float
    temperatureUnit: str
    # etc define other period properties


class Elevation(BaseModel):
    unitCode: str
    value: float


class Properties(BaseModel):
    updated: datetime
    units: str
    forecastGenerator: str 
    generatedAt: datetime
    updateTime: datetime
    validTimes: str
    elevation: Elevation
    periods: list[Period]


class Geometry(BaseModel):
    type: str = "Polygon"
    coordinates: list[list[list[float]]] 


class Forecast(BaseModel):
    type: str = "Feature"
    geometry: Geometry 
    properties: Properties
