import React from 'react';

const Popup = ({ isOpen, message, closePopup }) => {
  // console.log('working');
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-inner">
        <p>{message}</p>
        <button onClick={closePopup}>OK</button>
      </div>
    </div>
  );
};

export default Popup;
