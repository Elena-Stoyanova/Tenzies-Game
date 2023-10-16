import React from 'react';
import useFormatTime from '../useFormatTime';
import TopScore from './TopScore';

export default function Stopwatch({
  winTenzies,
  rollsCount,
  resetStopwatch,
  showFailPopup,
}) {
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [failTime, setFailTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(Date.now());

  React.useEffect(() => {
    if (resetStopwatch) {
      setFailTime(0);
      setStartTime(Date.now());
    }
  }, [resetStopwatch]);

  React.useEffect(() => {
    let intervalId;

    if (!winTenzies) {
      intervalId = setInterval(() => {
        const elapsedTimeFromStart = Date.now() - startTime;
        const lastElapsedTime = elapsedTime;

        if (showFailPopup) {
          setFailTime(elapsedTimeFromStart - lastElapsedTime);
          return;
        }

        setElapsedTime(elapsedTimeFromStart - failTime);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [showFailPopup, elapsedTime, winTenzies, startTime, failTime]);

  const time = useFormatTime(elapsedTime);

  return (
    <>
      <div className='time-container'>
        <h3 className='time'>Time: {time}</h3>
        <h3 className='rolls'>Rolls: {rollsCount}</h3>
      </div>
      <TopScore
        winTenzies={winTenzies}
        resetStopwatch={resetStopwatch}
        rollsCount={rollsCount}
        elapsedTime={elapsedTime}
      />
    </>
  );
}
