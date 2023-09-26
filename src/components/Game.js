import React from 'react';
import '../App.css';
import Die from './Die';
import Confetti from 'react-confetti';
import Timer from './Timer';
import logo from '../images/Game-logo.png';
import Popup from './Popup';
import useWindowSize from '../useWindowSize';

export default function Game() {
  const [dice, setDice] = React.useState(newGame());
  const [winTenzies, setWinTenzies] = React.useState(false);
  const [rollsCount, setRollsCount] = React.useState(0);
  const [resetTimer, setResetTimer] = React.useState(false);
  const [isFailedGame, setIsFailedGame] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setWinTenzies(true);
    }
    if (allHeld && !allSameValue) {
      setIsFailedGame(true);
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

  function startNewGame() {
    setWinTenzies(false);
    setRollsCount(0);
    setDice(newGame());
    setResetTimer(true);
  }

  function rollDice() {
    if (!winTenzies) {
      setResetTimer(false);
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

  const { width, height } = useWindowSize();

  return (
    <main className='main'>
      {winTenzies && <Confetti width={width} height={height} />}
      <img src={logo} className='game-logo' alt='logo' />

      {isFailedGame && (
        <Popup clickHandler={() => setIsFailedGame(!isFailedGame)} />
      )}

      <div className='dice-container'>{diceElements}</div>

      <Timer
        winTenzies={winTenzies}
        resetTimer={resetTimer}
        rollsCount={rollsCount}
        isFailedGame={isFailedGame}
      />

      <button className='roll-dice--button' onClick={rollDice}>
        {winTenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
