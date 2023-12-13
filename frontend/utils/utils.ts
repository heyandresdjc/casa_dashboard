function convertToSeconds(timeString: string) {
    const regex = /(\d+h)?(\d+m)?(\d+s)?/;
    const match = timeString.match(regex);
    if (match){
        const hours = match[1] ? parseInt(match[1], 10) * 3600 : 0;
        const minutes = match[2] ? parseInt(match[2], 10) * 60 : 0;
        const seconds = match[3] ? parseInt(match[3], 10) : 0;
        return hours + minutes + seconds;
    } else {
        return 0
    }
}

export {convertToSeconds}
