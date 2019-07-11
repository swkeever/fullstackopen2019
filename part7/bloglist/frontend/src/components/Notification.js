import React from 'react';
import PropTypes from 'prop-types';
import propTypesHelper from '../utils/proptypes';

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
  );
};

Notification.propTypes = {
  notification: PropTypes.shape(propTypesHelper.NOTIFICATION).isRequired,
};

export default Notification;
