import useStopwatch from '../hooks/useStopwatch';
import useFormatTime from '../hooks/useFormatTime';
import TopScore from './TopScore';

export default function TimeAndScore({
  winTenzies,
  rollsCount,
  showFailPopup,
  resetStopwatch,
}) {
  const elapsedTime = useStopwatch(!winTenzies, showFailPopup, resetStopwatch);
  const time = useFormatTime(elapsedTime);

  return (
    <>
      <div className='time-container'>
        <h4 className='time'>Time: {time}</h4>
        <h4 className='rolls'>Rolls: {rollsCount}</h4>
      </div>
      <TopScore
        winTenzies={winTenzies}
        rollsCount={rollsCount}
        elapsedTime={elapsedTime}
      />
    </>
  );
}
