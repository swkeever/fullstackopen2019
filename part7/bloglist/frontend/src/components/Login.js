import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Form, Button, Header } from 'semantic-ui-react';
import { useField } from '../hooks';
import { setUser } from '../reducers/userReducer';
import { setSuccessNotification, setFailureNotification } from '../reducers/notificationReducer';

const Login = (props) => {
  const username = useField('text');
  const password = useField('password');

  const inputProps = ['value', 'type', 'onChange'];
  const usernameProps = _.pick(username, inputProps);
  const passwordProps = _.pick(password, inputProps);

  const userLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username.value,
      password: password.value,
    };

    try {
      await props.setUser(credentials);
      props.setSuccessNotification(`Logged in as ${credentials.username}`);
    } catch (exception) {
      props.setFailureNotification('Login failed');
    }
  };

  return (
    <Container>
      <Header as="h2">Login</Header>
      <Form onSubmit={userLogin}>
        <Form.Field>
          <label htmlFor="username">
            <input
              {...usernameProps}
              id="username"
              name="username"
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">
            <input
              {...passwordProps}
              id="password"
              name="username"
            />
          </label>
        </Form.Field>
        <Button type="submit">
            Login
        </Button>
      </Form>
    </Container>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setSuccessNotification: PropTypes.func.isRequired,
  setFailureNotification: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  setUser,
  setSuccessNotification,
  setFailureNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
