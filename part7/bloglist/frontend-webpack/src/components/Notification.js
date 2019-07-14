import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Container } from 'semantic-ui-react';
import propTypesHelper from '../utils/proptypes';

const Notification = ({
  notification = null,
}) => {
  if (!notification) {
    return null;
  }

  if (notification.class === 'error') {
    return (
      <Container>
        <Message negative>
          <Message.Header>Error.</Message.Header>
          <p>{notification.message}</p>
        </Message>
      </Container>

    );
  }

  return (
    <Container>
      <Message positive>
        <Message.Header>Success!</Message.Header>
        <p>
          {notification.message}
        </p>
      </Message>
    </Container>


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
