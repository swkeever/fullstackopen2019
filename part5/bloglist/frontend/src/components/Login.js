import React from 'react';
import loginService from '../services/login';
import tokenService from '../services/token';
import notificationService from '../services/notification.js';

const Login = ({
  username, setUsername,
  password, setPassword,
  setUser,
}) => {
  const showLoginFailed = () => {
    return (
      <p>Login failed</p>
    )
  }

  const userLogin = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('logged-blog-app-user', JSON.stringify(user));
      tokenService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      // TODO: show error message to user
    }
  }

  const handleChange = (value, setValue) => {
    setValue(value);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={userLogin}>
        <div>
          <label htmlFor="username">
            <input
              type="text"
              onChange={({ target }) => handleChange(target.value, setUsername)}
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
              onChange={({ target }) => handleChange(target.value, setPassword)}
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