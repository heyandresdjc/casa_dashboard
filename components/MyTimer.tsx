// "use client" <-- include this directive if your using Next.js 13
import React, {FormEvent, useState, useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import {convertToSeconds} from "@/utils/utils";


export const MyTimer = () => {
    const [
        converted,
        setConverted
    ] = useState<number>(300);
    const [
        expiryTimestamp,
        setExpiryTimestamp
    ] = useState(new Date(Date.now() + 600));

    useEffect(() => {
        setExpiryTimestamp(new Date(Date.now() + converted * 1000));
        },
        [converted]
    );

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let timeString: string = formData.get("time")?.toString() || "5m"
        let converted = convertToSeconds(timeString);

        if (converted !== null){
            console.log(converted);
            setConverted(converted);
        }
    }

    const stylingClasses: string = "m-5 p-5 text-2xl text-center rounded bg-sky-500 hover:bg-sky-700";

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp, autoStart: false, onExpire: () => alert('onExpire called')
    });

    return (
       <>
           <form onSubmit={onSubmit}>
               <input style={{color: "black"}}
                      className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="time"
                      type="text"
                      placeholder="5m"
                      name="time"
               />
               <button className="m-3 p-3 text-center rounded bg-sky-500 hover:bg-sky-700"
                       type="submit">Submit</button>
           </form>
           {
               expiryTimestamp !== null && converted !== null ? <>
                   <p style={{fontSize: 75, color: isRunning ? "green" : "red"}}>
                       <span>{String(days).padStart(2, "0")}</span>:
                       <span>{String(hours).padStart(2, "0")}</span>:
                       <span>{String(minutes).padStart(2, "0")}</span>:
                       <span>{String(seconds).padStart(2, "0")}</span>
                   </p>
                   <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                       <a className={stylingClasses} onClick={start}>Start</a>
                       <a className={stylingClasses} onClick={pause}>Pause</a>
                       <a className={stylingClasses} onClick={resume}>Resume</a>
                       <a className={stylingClasses} onClick={() => {
                           const newTimeStamp = new Date(Date.now() + 300 * 1000)
                           restart(newTimeStamp, false)
                       }}>Restart
                       </a>
                   </div>
               </>: <h3>Loading..</h3>
           }
       </>
   );
}
