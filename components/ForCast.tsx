import Image from 'next/image'


const ForeCast = ({foreCast}) => {
    /*
    * {
        "number": 1,
        "name": "",
        "startTime": "2023-12-12T18:00:00-05:00",
        "endTime": "2023-12-12T19:00:00-05:00",
        "isDaytime": false,
        "temperature": 74,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 2
        },
        "dewpoint": {
          "unitCode": "wmoUnit:degC",
          "value": 17.222222222222221
        },
        "relativeHumidity": {
          "unitCode": "wmoUnit:percent",
          "value": 69
        },
        "windSpeed": "14 mph",
        "windDirection": "NE",
        "icon": "https://api.weather.gov/icons/land/night/bkn,2?size=small",
        "shortForecast": "Mostly Cloudy",
        "detailedForecast": ""
      },
    * */

    const startTime = new Date(foreCast.startTime);
    const endTime = new Date(foreCast.endTime);


    const startHour = startTime.getHours();

    const endHour = endTime.getHours();

    const isSameDay: boolean = startHour - endHour < 0

    const fullDate: string = startTime.getFullYear() + "-" + startTime.getMonth() + "-" + startTime.getDate()
    const betweenDatesStart: string = startTime.getFullYear() + "-" + startTime.getMonth() + "-" + startTime.getDate()
    const betweenDatesEnd: string = endTime.getFullYear() + "-" + endTime.getMonth() + "-" + endTime.getDate()

    let title: string = `${isSameDay? fullDate: betweenDatesStart + " between " + betweenDatesEnd}`

    return (

<a href="#"
   className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={foreCast.icon}
        alt={foreCast.shortForecast}
    />
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            There is going to be wind of {foreCast.windSpeed} directed at {foreCast.windDirection}
        </p>
    </div>
</a>

    )

}

export default ForeCast;
