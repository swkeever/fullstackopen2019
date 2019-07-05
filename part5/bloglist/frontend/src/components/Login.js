import React from 'react';
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
      notificationHelper.setNotification(loginSuccess, setNotification);
      setUser(user);
    } catch (exception) {
      const loginFailed = notificationHelper.createNotification('Logged in failed', notificationHelper.ERROR);
      notificationHelper.setNotification(loginFailed, setNotification);
    }
  }

  return (
    <div>
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
  )
};

export default Login;