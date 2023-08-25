import React from 'react'

export default function Timer(props) {
    const [time, setTime] = React.useState(0)
    const [isRunning, setIsRunning] = React.useState(true)

    React.useEffect(() => {
        props.winTenzies ? setIsRunning(false) :  setIsRunning(true)
        
        if(props.resetTimer) {
            setTime(0)
        }
    },[props.resetTimer, props.winTenzies])

    React.useEffect(() => {
        let intervalId
        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1), 10)
        }
        return () => clearInterval(intervalId)
    }, [isRunning, time])
    
    function formattedTime(time){
        const minutes = Math.floor((time % 360000) / 6000).toString().padStart(2, "0")
        const seconds = Math.floor((time % 6000) / 100).toString().padStart(2, "0")
        const milliseconds = (time % 100).toString().padStart(2, "0")

        return `${minutes} : ${seconds} : ${milliseconds}`
    }
    
    return (
        <span>{formattedTime(time)}</span>
    )
}