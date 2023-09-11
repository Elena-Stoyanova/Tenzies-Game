import React from 'react';
import './Popup.css';

const Popup = ({ clickHandler }) => {
  return (
    <div className='popup-box'>
      <div className='box'>
        <h3 className='warnning-text'>
          Please, check that all dice are of the same value!{' '}
        </h3>
        <button className='popup-button' onClick={clickHandler}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Popup;
