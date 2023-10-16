export default function useFormatTime(time) {
  const MILLISECONDS_PER_MINUTE = 60000;
  const MILLISECONDS_PER_SECOND = 1000;

  const minutes = Math.floor(time / MILLISECONDS_PER_MINUTE);

  const seconds = Math.floor(
    (time % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND
  );

  const milliseconds = Math.floor((time % MILLISECONDS_PER_SECOND) / 10);

  function pad(number) {
    return number.toString().padStart(2, '0');
  }

  const displayTime = `${pad(minutes)} : ${pad(seconds)} : ${pad(
    milliseconds
  )}`;

  return displayTime;
}
