"use client";
import WeatherWidget from "../components/weather/widgets";
import TimerWidget from "../components/timer/widget";
import {useEffect, useState} from "react";
import FlatObjDisplayList from "@/components/flatObjectDisplay";
import ActiveProcesses from "@/components/systemStats/activeProcesses";


export default function Home() {

    const [serverData, setServerData] = useState(null);
    const [serverStatus, setServerStatus] = useState(null);

    const getServerConfig = (): void => {
        let url: string = `http://0.0.0.0:8000/config`
        fetch(url)
            .then(response => response.json())
            .then(data => {setServerData(data)});
    }

    const getServerStatus = (): void => {
        let url: string = `http://0.0.0.0:8000/status`
        fetch(url)
            .then(response => response.json())
            .then(data => {setServerStatus(data)});
    }

    useEffect(
        (): void => {
            getServerConfig();
            getServerStatus();
        },
        []
    );

    return (
        <main className="container mx-auto">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    DJC Home Page
                </h1>
            </div>
            <div className="container my-5">
                <TimerWidget/>
                <WeatherWidget/>
            </div>
            <div className="container m-9">
                <h1 className="text-6xl">Config Page</h1>
                <div className="grid grid-cols-4 gap-3">
                    <FlatObjDisplayList title={"Server Config"} stats={serverData}/>
                    <FlatObjDisplayList title="Memory Stats" stats={serverStatus?.memory}/>
                    <FlatObjDisplayList title="Network Stats" stats={serverStatus?.network}/>
                    <FlatObjDisplayList title="Swap" stats={serverStatus?.swap}/>
                    {/*<li>{serverStatus.cpu_times_percent}</li>*/}
                    {/*<li>{serverStatus.process_count}</li>*/}
                    {/*<li>{serverStatus.swap}</li>*/}
                    {/*<li>{serverStatus.cpu_stats}</li>*/}
                    {/*<li>{serverStatus.boot_time}</li>*/}
                </div>
                <ActiveProcesses activeProcesses={serverStatus?.active_processes}/>
            </div>
        </main>
    )
}
