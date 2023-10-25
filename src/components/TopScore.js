import React from 'react';
import useFormatTime from '../hooks/useFormatTime';

export default function TopScore({ winTenzies, rollsCount, elapsedTime }) {
  const topScore = JSON.parse(localStorage.getItem('topScore')) || {
    rolls: null,
    time: 0,
  };

  if (winTenzies) {
    if (topScore.rolls === null || elapsedTime < topScore.time) {
      localStorage.setItem(
        'topScore',
        JSON.stringify({ rolls: rollsCount, time: elapsedTime })
      );
    }
  }

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
