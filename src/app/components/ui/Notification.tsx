import React, { useState, useEffect } from 'react';

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [message]);

  if (!show) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {message}
    </div>
  );
};

export default Notification;
