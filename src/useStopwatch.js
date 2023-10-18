import React from 'react';

export default function useStopwatch(start, reset, pause) {
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

    if (start) {
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
  }, [pause, elapsedTime, start, startTime, pauseTime]);

  return elapsedTime;
}
