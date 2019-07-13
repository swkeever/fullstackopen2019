import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import propTypesHelper from '../utils/proptypes';

const Notification = ({
  notification = null,
}) => {
  if (!notification) {
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

Notification.defaultProps = {
  notification: null,
};

Notification.propTypes = {
  notification: PropTypes.shape(propTypesHelper.NOTIFICATION),
};

const mapStateToProps = state => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Notification);
