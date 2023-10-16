import React from 'react';
import './Popup.css';

export default function Popup({ clickHandler, winTenzies }) {
  const [id, setId] = React.useState('fail');

  React.useEffect(() => {
    if (winTenzies) {
      setId('win');
    }
  }, [winTenzies]);

  return (
    <div className='popup-box'>
      <div className='box' id={id}>
        <h3 className='text' id={id}>
          {winTenzies ? (
            <>
              <h3>🎉 YOU WIN! 🎉</h3>
              <p> Try to outdo yourself.</p>
            </>
          ) : (
            'Please, check that all dice are of the same value!'
          )}
        </h3>
        <button className='popup-button' id={id} onClick={clickHandler}>
          Ok
        </button>
      </div>
    </div>
  );
}
