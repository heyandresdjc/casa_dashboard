from pydantic import BaseModel, HttpUrl, Field
from datetime import datetime


class UnitMeasure(BaseModel):
    unitCode: str
    unitType: str


class Geometry(BaseModel):
    type: str = "Point"
    coordinates: list[float|int]


class RelativeLocationProperties(BaseModel):
    city: str
    state: str
    distance: UnitMeasure
    bearing: UnitMeasure


class RelativeLocation(BaseModel):
    type: str
    geometry: Geometry
    properties: RelativeLocationProperties


class WeatherDataProperties(BaseModel):
    id: HttpUrl = Field(alias="@id")
    type: str = Field(alias="@type")
    cwa: str
    forecastOffice: HttpUrl
    gridId: str 
    gridX: int
    gridY: int
    forecast: HttpUrl
    forecastHourly: HttpUrl 
    forecastGridData: HttpUrl
    observationStations: HttpUrl
    relativeLocation: RelativeLocation
    forecastZone: HttpUrl
    timeZone: str
    radarStation: str


class WeatherDataRootFeature(BaseModel):
    context: list[str|dict] = Field(alias="@context")
    type: str = "Feature"
    id: str
    geometry: Geometry
    properties: WeatherDataProperties


class Period(BaseModel):
    number: int
    name: str
    startTime: datetime
    endTime: datetime
    isDaytime: bool
    temperature: float
    temperatureUnit: str


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


class Forecast(BaseModel):
    context: list[str|dict] = Field(alias="@context")
    type: str = "Feature"
    geometry: Geometry 
    properties: Properties
