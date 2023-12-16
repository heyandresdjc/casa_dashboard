interface UnitValue {
    unitCode: string;
    value: number;
}

interface WeatherData {
  "@context": (string | { [key:string]: string })[];
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    updated: string;
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string,
    elevation: UnitValue;
    periods: period[];
  };
}

interface period {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  probabilityOfPrecipitation: UnitValue;
  dewpoint: UnitValue;
  relativeHumidity: UnitValue;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}