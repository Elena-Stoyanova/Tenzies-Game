import React from 'react';
import Game from './components/Game';
import logo from './images/App-logo.png';

export default function App() {
  const [showGame, setShowGame] = React.useState(false);
  const [city, setCity] = React.useState('');

  React.useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json/?key=9nLcPDX63sfyU3VJ0Sg9')
      .then((res) => res.json())
      .then((response) => {
        setCity(response.city);
      })
      .catch((data, status) => {
        console.log('Request failed:', data);
      });
  }, []);

  if (showGame) {
    return <Game />;
  }

  return (
    <div className='app'>
      <img src={logo} className='logo' alt='logo' />
      <h2 className='title'>🎉 Hello user {city && `from ${city}`}! 🎉</h2>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it <br />
        at its current value between rolls.
      </p>
      <button className='app--button' onClick={() => setShowGame(true)}>
        Start Game
      </button>
    </div>
  );
}
