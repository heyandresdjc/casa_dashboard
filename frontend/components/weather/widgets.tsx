"use client";
import {useEffect, useState} from 'react';
import Image from "next/image";


const TempParser = (period: period): string => {
    return period.temperature+"°"+period.temperatureUnit
}


const TimeParser = (period: period) => {

    let hour: number = parseInt(period.startTime.split("T")[1].split(":")[0])
    let theEnd: string = hour > 12 ?" PM" :  "AM"
    let transformHour: number = hour > 12 ? hour - 12 : hour

    return <>
        <span className="font-semibold mt-1 text-sm">{transformHour}:00</span>
        <span className="text-xs font-semibold text-gray-400">{theEnd}</span>
    </>
}


const WeatherWidget = () => {
    const [forecastHourlyData, setForecastHourlyData] = useState(null);
    const [relativeLocation, setRelativeLocation] = useState(null);

    const getLocation = (): void => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let url: string = `http://0.0.0.0:8000/weather/${position.coords.latitude},${position.coords.longitude}`
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        let location = data.properties?.relativeLocation.properties

                        setRelativeLocation(location)
                        fetch(`http://0.0.0.0:8000/weather/${position.coords.latitude},${position.coords.longitude}/hourly`)
                            .then(response => response.json())
                            .then(data => setForecastHourlyData(data.properties.periods))
                            .catch(error => console.error(error))
                    });
            }, function(error) {
                console.error("Error occurred. Error code: " + error.code);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    useEffect(
        (): void => {
        getLocation();
        },
        []
    );

    const relativeLocationAqr: any = relativeLocation? relativeLocation:null;

    const forecastHourlyDataAqr: period[] = forecastHourlyData ? forecastHourlyData:[];
    
    const firstFivePeriods = forecastHourlyDataAqr ? forecastHourlyDataAqr.slice(0, 5):[];

    const first = firstFivePeriods[0];

    // @ts-ignore
    return (
        <div className="w-full max-w-screen-sm bg-white p-5 rounded-xl ring-8 ring-white ring-opacity-40 text-gray-500 m-5">
            <div className="w-full max-w-screen-sm bg-white p-5 rounded-xl ring-8 ring-white ring-opacity-40">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-6xl font-bold">
                            {firstFivePeriods.length ? TempParser(first):"Loading..."}
                        </span>
                        <span className="font-semibold mt-1 text-gray-500">
                            {
                                relativeLocationAqr ?
                                    `${relativeLocationAqr?.city}, ${relativeLocationAqr?.state}` :
                                    "Loading.."
                            }
                        </span>
                    </div>
                    <Image src="/svg/weather/not-available.svg" alt="N/A" width={120} height={120}/>
                </div>
                <div className="flex justify-between mt-12">
                    {firstFivePeriods.map((period: period, index: number) => <div key={index} className="flex flex-col items-center">
                        <span className="font-semibold text-lg">
                            {TempParser(period) || "Loading..."}
                        </span>
                        <img src={period.icon} alt={period.shortForecast}/>
                        {TimeParser(period) || "Loading..."}
                    </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default WeatherWidget;