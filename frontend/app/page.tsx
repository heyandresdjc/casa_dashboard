"use client";
import WeatherWidget from "../components/weather/widgets";
import TimerWidget from "../components/timer/widget";


export default function Home() {
      return (
          <main className="container mx-auto">
              <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                  <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    DJC Home Page
                </h1>
              </div>
              <div className="container my-5">
                <TimerWidget />
                <WeatherWidget />
              </div>
          </main>
      )
}
