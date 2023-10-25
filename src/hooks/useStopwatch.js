import React from 'react';

export default function useStopwatch(start, stop, reset) {
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(Date.now());
  const [stopTime, setStopTime] = React.useState(0);

  React.useEffect(() => {
    if (reset) {
      setStartTime(Date.now());
    }
  }, [reset]);

  React.useEffect(() => {
    let intervalId;

    if (start) {
      intervalId = setInterval(() => {
        const elapsedTimeFromStart = Date.now() - startTime;

        if (stop) {
          setStopTime(elapsedTimeFromStart - elapsedTime);
          return;
        }

        setElapsedTime(elapsedTimeFromStart - stopTime);
      }, 50);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [elapsedTime, start, startTime, stop, stopTime]);

  return elapsedTime;
}
