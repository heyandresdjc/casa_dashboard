import {useEffect, useState} from "react";
import ForeCast from "@/components/ForCast";

const api: string = "https://api.weather.gov/alerts/active?area=FL";

const MyWeather = () => {
    const [data, setData] = useState(null);
    const [forcastData, setForcastData] = useState(null);

    const getLocation = () => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                fetch(`https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`)
                  .then(response => response.json())
                  .then(data => {
                      fetch(data.properties.forecastHourly).then(response => response.json()).then(
                          data => setForcastData(data)
                      )
                  });
            }, function(error) {
                console.error("Error occurred. Error code: " + error.code);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => setData(data));
        getLocation();}, []);
    return (
        <div>
            {data ? (
                <div>
                    <h1>{data.title}</h1>
                    <p>Last Updated: {data.updated}</p>
                    <ul>
                    {
                            data.features.map((feature, index) => (
                                <li key={index}>
                                    {JSON.stringify(feature.senderName)}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            ) : (
                "Loading any warnings..."
            )}
            <ul>
                {
                    forcastData ? <div>
                        {Object.entries(forcastData.properties.periods).map(([key, value]) => (
                            <li key={key}>
                                <ForeCast foreCast={value}/>
                                {/*{value.temperature + value.temperatureUnit}*/}
                            </li>
                        ))}
                    </div> : <li>Loading Forecast</li>
                }
            </ul>
        </div>
    );
}


export default MyWeather;
