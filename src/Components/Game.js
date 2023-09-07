import React from 'react';
import '../App.css';
import './Die.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Timer from './Timer';
import logo from '../game-logo.png';
import Background from '../Background';
import Footer from './Footer';
import Popup from './Popup';

export default function Game() {
  const [dice, setDice] = React.useState(allNewDice());
  const [winTenzies, setWinTenzies] = React.useState(false);
  const [rollsCount, setRollsCount] = React.useState(0);
  const [resetTimer, setResetTimer] = React.useState(false);
  const [failGame, setFailGame] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    window.addEventListener('resize', function () {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeightsetWindowHeight);
    });
  }, []);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setWinTenzies(true);
    }
    if (allHeld && !allSameValue) {
      setFailGame(true);
    } else {
      setFailGame(false);
    }
  }, [dice]);

  const togglePopup = () => {
    setFailGame(!failGame);
  };
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    //freeze dice
    if (!winTenzies) {
      setResetTimer(false);
      setRollsCount((prevNum) => prevNum + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      //new game
      setWinTenzies(false);
      setRollsCount(0);
      setDice(allNewDice());
      setResetTimer(true);
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

  return (
    <>
      <main>
        {winTenzies && <Confetti width={windowWidth} height={windowHeight} />}
        <img src={logo} className='game-logo' alt='logo' />

        {failGame && (
          <Popup
            content={
              <>
                <h3 className='warnning-text'>
                  Please, check that all dice are of the same value!{' '}
                </h3>
                <button className='popup-button' onClick={togglePopup}>
                  Ok
                </button>
              </>
            }
          />
        )}

        <div className='dice-container'>{diceElements}</div>

        <Timer
          winTenzies={winTenzies}
          resetTimer={resetTimer}
          rollsCount={rollsCount}
        />

        <button className='roll-dice--button' onClick={rollDice}>
          {winTenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
      <Footer />
    </>
  );
}
