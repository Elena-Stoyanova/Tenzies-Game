import React from 'react';
import useFormatTime from '../useFormatTime';

export default function Stopwatch({ stop, reset, pause, getStopwatchTime }) {
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [pauseTime, setPauseTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(Date.now());

  React.useEffect(() => {
    if (reset) {
      setPauseTime(0);
      setStartTime(Date.now());
    }
  }, [reset]);

  React.useEffect(() => {
    let intervalId;

    if (!stop) {
      intervalId = setInterval(() => {
        const elapsedTimeFromStart = Date.now() - startTime;
        const lastElapsedTime = elapsedTime;

        if (pause) {
          setPauseTime(elapsedTimeFromStart - lastElapsedTime);
          return;
        }

        setElapsedTime(elapsedTimeFromStart - pauseTime);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [pause, elapsedTime, stop, startTime, pauseTime]);

  const time = useFormatTime(elapsedTime);
  getStopwatchTime(elapsedTime);

  return <h3 className='time'>Time: {time}</h3>;
}
