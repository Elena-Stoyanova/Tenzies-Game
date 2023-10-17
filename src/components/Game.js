import React from 'react';
import '../App.css';
import Die from './Die';
import Confetti from 'react-confetti';
import Stopwatch from './Stopwatch';
import logo from '../images/Game-logo.png';
import Popup from './Popup';
import TopScore from './TopScore';
import useWindowSize from '../useWindowSize';

export default function Game() {
  const [dice, setDice] = React.useState(newGame());
  const [winTenzies, setWinTenzies] = React.useState(false);
  const [rollsCount, setRollsCount] = React.useState(0);
  const [resetStopwatch, setResetStopwatch] = React.useState(false);
  const [showFailPopup, setShowFailPopup] = React.useState(false);
  const [showWinPopup, setShowWinPopup] = React.useState(false);
  const [stopwatchTime, setStopwatchTime] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setWinTenzies(true);
      setShowWinPopup(true);
    }
    if (allHeld && !allSameValue) {
      setShowFailPopup(true);
    }
  }, [dice]);

  function generateRandomDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.random(),
    };
  }

  function newGame() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateRandomDie());
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function startNewGame() {
    setWinTenzies(false);
    setRollsCount(0);
    setDice(newGame());
    setResetStopwatch(true);
  }

  function rollDice() {
    if (!winTenzies) {
      setResetStopwatch(false);
      setRollsCount((prevNum) => prevNum + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateRandomDie();
        })
      );
    } else {
      startNewGame();
    }
  }

  function showPopup() {
    if (showWinPopup) {
      return (
        <Popup
          clickHandler={() => setShowWinPopup(!showWinPopup)}
          className='win'
          text={
            <>
              <h2 className='text win-title'>🎉 YOU WIN! 🎉</h2>
              <h3 className='text win-subtitle'> Try to outdo yourself.</h3>
            </>
          }
        />
      );
    }
    if (showFailPopup) {
      return (
        <Popup
          clickHandler={() => setShowFailPopup(!showFailPopup)}
          backgroundColor='#ffe79e'
          color='#4430c5'
          className='fail'
          text={
            <h3 className='text fail-title'>
              Please, check that all dice are of the same value!
            </h3>
          }
        />
      );
    }
  }

  const { width, height } = useWindowSize();

  return (
    <main className='main'>
      {winTenzies && <Confetti width={width} height={height} />}
      <img src={logo} className='game-logo' alt='logo' />

      {showPopup()}

      <div className='dice-container'>{diceElements}</div>

      <div className='time-container'>
        <Stopwatch
          stop={winTenzies}
          reset={resetStopwatch}
          pause={showFailPopup}
          getStopwatchTime={(time) => setStopwatchTime(time)}
        />
        <h3 className='rolls'>Rolls: {rollsCount}</h3>
      </div>

      <TopScore
        winTenzies={winTenzies}
        resetStopwatch={resetStopwatch}
        rollsCount={rollsCount}
        elapsedTime={stopwatchTime}
      />

      <button className='roll-dice--button' onClick={rollDice}>
        {winTenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
