import React from 'react';

const Notification = ({store}) => {
  const {notification} = store.getState();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.length ? '' : 'none',
  };

  return (
      <div style={style}>
        {notification}
      </div>
  );
};

export default Notification;