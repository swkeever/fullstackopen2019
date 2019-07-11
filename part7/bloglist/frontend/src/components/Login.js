import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import loginService from '../services/login';
import tokenService from '../utils/token';
import localStorageService from '../utils/local_storage';
import notificationHelper from '../utils/notification';
import { useField } from '../hooks';

const Login = ({
  setUser,
  setNotification,
}) => {
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
      const user = await loginService.login(credentials);
      localStorageService.setLocalStorage(user);
      tokenService.setToken(user.token);

      const loginSuccess = notificationHelper.createNotification(`Logged in as ${user.name}`, notificationHelper.SUCCESS);
      notificationHelper.changeNotification(loginSuccess, setNotification);
      setUser(user);
    } catch (exception) {
      const loginFailed = notificationHelper.createNotification('Login failed', notificationHelper.ERROR);
      notificationHelper.changeNotification(loginFailed, setNotification);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={userLogin}>
        <div>
          <label htmlFor="username">
            <input
              {...usernameProps}
              id="username"
              name="username"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              {...passwordProps}
              id="password"
              name="username"
            />
          </label>
        </div>
        <div>
          <button type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Login;
