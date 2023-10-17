import React from 'react';
import './Popup.css';

export default function Popup({ clickHandler, className, text }) {
  return (
    <div className='popup'>
      <div className={`box box-${className}`}>
        {text}
        <button
          className={`popup-button button-${className}`}
          onClick={clickHandler}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
