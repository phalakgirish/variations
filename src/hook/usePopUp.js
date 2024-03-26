import { useState } from 'react';

const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openPopup = (msg) => {
    setMessage(msg);
    setIsOpen(true);
    console.log('popup open');
  };

  const closePopup = () => {
    setMessage('');
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    openPopup,
    closePopup,
  };
};

export default usePopup;
