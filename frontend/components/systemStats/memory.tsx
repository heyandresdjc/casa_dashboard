const MemoryStats = ({stats}) => {
    const {
        total,
        available,
        percent,
        used,
        free,
        active,
        inactive,
        buffers
    } = stats;

    return(
        <div className="memory-stats">
            <div className="card">
                <p>Total: {total}</p>
            </div>

            <div className="card">
                <p>Available: {available}</p>
            </div>

            <div className="card">
                <p>Percent: {percent}</p>
            </div>

            <div className="card">
                <p>Used: {used}</p>
            </div>

            <div className="card">
                <p>Free: {free}</p>
            </div>

            <div className="card">
                <p>Active: {active}</p>
            </div>

            <div className="card">
                <p>Inactive: {inactive}</p>
            </div>

            <div className="card">
                <p>Buffers: {buffers}</p>
            </div>
        </div>
    )
}


export default MemoryStats
