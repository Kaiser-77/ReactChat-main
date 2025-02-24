const getLocalString = (time) => {
    return time.toLocaleTimeString()
}
const getTimeStamp = () => {
    return new Date().getTime()
}

export const _utils_time = {
    getLocalString,getTimeStamp
}