import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import blogsService from './services/blogs';
import Blogs from './components/Blogs'
import tokenService from './services/token';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInData = window.localStorage.getItem('logged-blog-app-user');

    if (loggedInData) {
      const user = JSON.parse(loggedInData);
      tokenService.setToken(user.token);
      setUser(user);
      console.log(user);
    }
  }, []);

  const showNotLoggedInView = () => (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      setUser={setUser}
    />
  );

  const showLoggedInView = () => {
    return (
      <Blogs 
        user={user}
        setUser={setUser}
      />
    )
  }

  return (
    <>
      {user ? showLoggedInView() : showNotLoggedInView()}
    </>
  );
}

export default App;
