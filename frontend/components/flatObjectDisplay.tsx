// @ts-ignore
const FlatObjDisplayList = ({title, stats}) => {

    let results = []

    for (const statsKey in stats) {
        const sta = stats[statsKey]
        results.push(
            <li key={statsKey} className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {statsKey}
                        </p>
                    </div>
                    <div
                        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {sta}
                    </div>
                </div>
            </li>
        )
    }



    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 my-5">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    {title}
                </h5>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    (Last 24 hours)
                </span>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {results}
                </ul>
            </div>
        </div>
    )
}


export default FlatObjDisplayList;
