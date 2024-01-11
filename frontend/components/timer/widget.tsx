"use client";
import {useEffect, useState} from "react";

const intervalKeys = ['days', 'hours', 'min', 'secs'];

const calculateTimeLeft = () => {
  let year = new Date().getFullYear();
  const difference = +new Date(`12/31/${year}`) - +new Date();

  let timeLeft = {
    days: 0,
    hours: 0,
    min: 0,
    secs: 0
  };

  if (difference > 0) {
    timeLeft = {
      "days": Math.floor(difference / (1000 * 60 * 60 * 24)),
      "hours": Math.floor((difference / (1000 * 60 * 60)) % 24),
      "min": Math.floor((difference / 1000 / 60) % 60),
      "secs": Math.floor((difference / 1000) % 60) || 0
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

    const result : any[] = [];

    for (let index = 0; index < intervalKeys.length; index++) {

        const currentKey = intervalKeys[index];

        if(currentKey === 'days' || currentKey === 'hours' || currentKey === 'min' || currentKey === 'secs') {
            result.push(
                <div key={index} className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span>{timeLeft[currentKey]}</span>
                    </span>
                    <span className="countdown font-mono text-2xl">
                        {currentKey}
                    </span>
                </div>
            )
        }
    }

    const timeLeftArray = Object.entries(timeLeft);


    return (
        <>
            <h1 className="countdown font-mono text-5xl">Count to {year +1}</h1>
            <div suppressHydrationWarning className="grid grid-flow-col gap-5 text-center auto-cols-max">
                {
                    result.length ? result: <h1>TIME&lsquo;S UP</h1>
                }
            </div>
        </>
    );
}


export default TimerWidget;
