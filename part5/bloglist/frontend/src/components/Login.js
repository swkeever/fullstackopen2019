import React from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';
import tokenService from '../utils/token';
import localStorageService from '../utils/local_storage';
import formHelper from '../utils/form_helper';
import notificationHelper from '../utils/notification';

const Login = ({
  username, setUsername,
  password, setPassword,
  setUser,
  setNotification,
}) => {
  const userLogin = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

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
              type="text"
              onChange={({ target }) => formHelper.handleChange(target.value, setUsername)}
              value={username}
              id="username"
              name="username"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              type="password"
              onChange={({ target }) => formHelper.handleChange(target.value, setPassword)}
              value={password}
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
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Login;
