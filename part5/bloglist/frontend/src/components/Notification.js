import React, { useState, useEffect } from 'react';

const Notification = ({
  notification,
}) => {
  if (!notification.message) {
    return null;
  }

  return (
    <div className={notification.class}>
      <p>
        {notification.message}
      </p>
    </div>
  )

};

export default Notification;