"use client";
import WeatherWidget from "../components/weather/widgets";
import TimerWidget from "../components/timer/widget";


export default function Home() {
      return (
          <main className="container mx-auto">
              <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                  <h1>DJC Home Page</h1>
              </div>
              <TimerWidget />
              <WeatherWidget />
          </main>
      )
}
