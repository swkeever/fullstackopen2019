import React from 'react';

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null;
  }

  return (
    <div className={`notification ${notification.class}`}>
      {notification.message}
    </div>
  );
}

export default Notification;