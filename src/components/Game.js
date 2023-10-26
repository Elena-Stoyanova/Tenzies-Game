import React from 'react';
import logo from '../images/App-logo.png';
import '../App.css';
import Confetti from 'react-confetti';
import Die from './Die';
import Popup from './Popup';
import TimeAndScore from './TimeAndScore';
import useWindowSize from '../hooks/useWindowSize';
import uuid from 'react-uuid';

export default function Game() {
  const [dice, setDice] = React.useState(generateAllNewDice());
  const [winTenzies, setWinTenzies] = React.useState(false);
  const [rollsCount, setRollsCount] = React.useState(0);
  const [showFailPopup, setShowFailPopup] = React.useState(false);
  const [showWinPopup, setShowWinPopup] = React.useState(false);
  const [resetStopwatch, setResetStopwatch] = React.useState(false);

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
      id: uuid(),
    };
  }

  function generateAllNewDice() {
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
    setDice(generateAllNewDice());
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

  const { width, height } = useWindowSize();

  return (
    <main className='game-container container'>
      {winTenzies && <Confetti width={width} height={height} />}

      <img src={logo} className='game-logo' alt='logo' />

      {showWinPopup && (
        <Popup
          clickHandler={() => setShowWinPopup(!showWinPopup)}
          className='win'
          text={
            <>
              <h2 className='text win-title'>🎉 YOU WIN! 🎉</h2>
              <p className='text win-subtitle'> Try to outdo yourself.</p>
            </>
          }
        />
      )}

      {showFailPopup && (
        <Popup
          clickHandler={() => setShowFailPopup(!showFailPopup)}
          className='fail'
          text={
            <p className='text fail-subtitle'>
              Please, check that all dice are of the same value!
            </p>
          }
        />
      )}

      <div className='dice-container'>{diceElements}</div>

      <TimeAndScore
        winTenzies={winTenzies}
        rollsCount={rollsCount}
        showFailPopup={showFailPopup}
        resetStopwatch={resetStopwatch}
      />

      <button className='button game-button' onClick={rollDice}>
        {winTenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
