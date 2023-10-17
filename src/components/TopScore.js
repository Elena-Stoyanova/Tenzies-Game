import React from 'react';
import useFormatTime from '../useFormatTime';

export default function TopScore({ winTenzies, rollsCount, elapsedTime }) {
  const [topScore, setTopScore] = React.useState(
    JSON.parse(localStorage.getItem('topScore')) || { rolls: null, time: 0 }
  );

  React.useEffect(() => {
    if (winTenzies) {
      if (topScore.rolls === null) {
        setTopScore({ rolls: rollsCount, time: elapsedTime });
      }

      if (elapsedTime < topScore.time) {
        setTopScore({ rolls: rollsCount, time: elapsedTime });
      }
    }
  }, [rollsCount, winTenzies, elapsedTime, topScore.rolls, topScore.time]);

  React.useEffect(() => {
    localStorage.setItem('topScore', JSON.stringify(topScore));
  }, [topScore]);

  const topScoreTime = useFormatTime(topScore.time);
  return (
    <fieldset className='topScore'>
      <legend className='score-heading'>⭐ Top Score ⭐</legend>
      <div className='score-stats'>
        <p className='top-time'>
          {topScore.time === 0 ? '00:00:00' : topScoreTime} 'ms
        </p>
        <p className='top-rolls'>
          {topScore.rolls === null ? '0' : topScore.rolls} rolls
        </p>
      </div>
    </fieldset>
  );
}
