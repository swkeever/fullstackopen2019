import React, { useState } from 'react';

const Login = ({ show, setPage, setToken, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await login({
      variables: {
        username, password,
      },
    });

    if (result) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
      setPage('add')
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
