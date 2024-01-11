import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";

// @ts-ignore
const ActiveProcesses = ({activeProcesses}) => {
    return (
        <table className="border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="border border-slate-600">User</th>
                    <th className="border border-slate-600">CPU Percentage</th>
                    <th className="border border-slate-600">Memory Percentage</th>
                    <th className="border border-slate-600">TIME</th>
                    <th className="border border-slate-600">Command</th>
                </tr>
            </thead>
            <tbody>
            {
                activeProcesses ? activeProcesses.map(
                    (process: {
                        [x: string]: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined;
                        }, index: Key | null | undefined) => {
                        return (
                            <tr key={index}>
                                <td className="border border-slate-600">{process["USER"]}</td>
                                <td className="border border-slate-600">{process["%CPU"]}</td>
                                <td className="border border-slate-600">{process["%MEM"]}</td>
                                <td className="border border-slate-600">{process["TIME"]}</td>
                                <td className="border border-slate-600 w-1/2">
                                    {process["COMMAND"]}
                                </td>
                            </tr>
                        )
                    }) : <tr>
                    <td className="border border-slate-600">N/A</td>
                </tr>
            }
            </tbody>
        </table>
    )
}


export default ActiveProcesses;
