import React, { useEffect } from 'react';

const Notification = ({ message, duration, onClose }) => {
  // Effect to automatically close the notification after the duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the notification after the duration
    }, duration);

    // Cleanup timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
