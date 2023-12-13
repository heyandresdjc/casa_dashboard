"use client";
import { MyTimer } from "@/components/MyTimer";
import MyWeather from "@/components/Weather";


export default function Home() {
      return (
          <main className="flex flex-col p-12">
              <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                  <h2>DJC Home Page</h2>
              </div>
              <MyWeather />
              {/*<MyTimer />*/}
          </main>
      )
}
