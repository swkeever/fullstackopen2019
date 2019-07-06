import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import tokenService from './utils/token';
import localStorageService from './utils/local_storage';
import Notification from './components/Notification'; import Togglable from './components/Togglable';
import CreateBlog from './components/CreateBlog';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    class: '',
  });

  const showBlogsRef = React.createRef();

  useEffect(() => {
    const storedUser = localStorageService.getLocalStorage();

    if (storedUser) {
      tokenService.setToken(storedUser.token);
      setUser(storedUser);
    }
  }, []);

  const showNotLoggedInView = () => (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      setUser={setUser}
      setNotification={setNotification}
    />
  );

  const showLoggedInView = () => {
    if (showBlogsRef.current) {
      showBlogsRef.current.toggleVisibility();
    }

    return (
      <>
        <Togglable buttonLabel="Create Blog">
          <CreateBlog
            setNotification={setNotification}
          />
        </Togglable>
        <Blogs
          user={user}
          setUser={setUser}
          setNotification={setNotification}
        />
      </>
    );
  };

  return (
    <>
      <Notification
        notification={notification}
      />
      {user ? showLoggedInView() : showNotLoggedInView()}
    </>
  );
};

export default App;
