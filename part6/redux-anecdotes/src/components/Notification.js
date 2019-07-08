import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const {notification} = props;

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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
}

export default connect(mapStateToProps)(Notification);