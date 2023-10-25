import React from 'react';
import useFormatTime from '../hooks/useFormatTime';
import TopScore from './TopScore';

export default function useStopwatch({ start, stop, rollsCount, reset }) {
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(Date.now());

  React.useEffect(() => {
    if (reset) {
      setStartTime(Date.now());
    }
  }, [reset]);

  React.useEffect(() => {
    let intervalId;
    let lastElapsedTime = 0;

    if (start) {
      intervalId = setInterval(() => {
        if (stop) {
          lastElapsedTime = Date.now() - startTime + lastElapsedTime;
          setStartTime(Date.now());
          return;
        }

        setElapsedTime(Date.now() - startTime + lastElapsedTime);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [start, startTime, stop]);

  const time = useFormatTime(elapsedTime);

  return (
    <>
      <div className='time-container'>
        <h3 className='time'>Time: {time}</h3>
        <h3 className='rolls'>Rolls: {rollsCount}</h3>
      </div>
      <TopScore
        winTenzies={!start}
        rollsCount={rollsCount}
        elapsedTime={elapsedTime}
      />
    </>
  );
}
