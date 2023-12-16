"use client";
import {useEffect, useState} from "react";


const calculateTimeLeft = () => {
  let year = new Date().getFullYear();
  const difference = +new Date(`12/31/${year}`) - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      min: Math.floor((difference / 1000 / 60) % 60),
      secs: Math.floor((difference / 1000) % 60) || 0
    };
  }
  return timeLeft;
}


const TimerWidget = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [year] = useState(new Date().getFullYear());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
            },
            1000);
        return () => clearTimeout(timer);
    });

    const timerComponents: number[] = [];
    Object.keys(timeLeft).forEach((interval) => {
        // @ts-ignore
        if (timeLeft[interval]) {
            timerComponents.push(
                // @ts-ignore
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span>{timeLeft[interval] ? timeLeft[interval]:0}</span>
                    </span>
                    {interval}
                </div>
            );
        } else {
            return;
        }
    });

    return (
        <div className="w-full max-w-screen-sm bg-white p-5 rounded-xl ring-8 ring-white ring-opacity-40 text-gray-500 m-5">
            <h1>End of the year: {year} Countdown</h1>
            {
                timerComponents.length ? <div className="grid grid-flow-col gap-5 text-center">
                    {timerComponents}
                </div> : <span>
                    Time&apos;s up!
                </span>
            }
        </div>
    );
}


export default TimerWidget;
