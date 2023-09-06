import React from 'react'

export default function Timer({ winTenzies, rollsCount, resetTimer }) {

    const [time, setTime] = React.useState(0)
    const [topScore, setTopScore] = React.useState(JSON.parse(localStorage.getItem('topScore')) || { rolls: null, time: 0 })

    React.useEffect(() => {
        if (winTenzies) {
            if (topScore.rolls === null) {
                console.log('yes')
                setTopScore(prevBest => {
                    return { ...prevBest, rolls: rollsCount, time: time }
                })
            }

            if (rollsCount < topScore.rolls || time < topScore.time) {
                setTopScore(prevBest => {
                    return { ...prevBest, rolls: rollsCount, time: time }
                })
            }
        }
    }, [rollsCount, winTenzies, time, topScore.rolls, topScore.time])

    React.useEffect(() => {
        localStorage.setItem('topScore', JSON.stringify(topScore))
    }, [topScore])

    React.useEffect(() => {
        if (resetTimer) {
            setTime(0)
        }
    }, [resetTimer])

    React.useEffect(() => {
        let intervalId
        if (!winTenzies) {
            intervalId = setInterval(() => setTime(time + 1), 10)
        }

        return () => clearInterval(intervalId)
    }, [winTenzies, time])

    function formattedTime(time) {
        const minutes = Math.floor((time % 360000) / 6000).toString().padStart(2, "0")
        const seconds = Math.floor((time % 6000) / 100).toString().padStart(2, "0")
        const milliseconds = (time % 100).toString().padStart(2, "0")

        return `${minutes} : ${seconds} : ${milliseconds}`
    }


    return (
        <>
            <div className="time-container">
                <h3 className='time'>Time: {formattedTime(time)}</h3>
                <h3 className="rolls">Rolls: {rollsCount}</h3>
            </div>
            <fieldset className='topScore'>
                <legend className='score-heading'>⭐ Top Score ⭐</legend>
                <div className='score-stats'>
                    <p className='top-time'>{topScore.time === 0 ? '00:00:00' : formattedTime(topScore.time)} 'ms</p>
                    <p className='top-rolls'>{topScore.rolls === null ? '0' : topScore.rolls} rolls</p>
                </div>
            </fieldset>
        </>
    )
}