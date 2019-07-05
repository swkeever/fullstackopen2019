import React from 'react';
import tokenService from '../utils/token';
import localStorageService from '../utils/local_storage';

const Logout = ({ setUser }) => {
  const logout = () => {
    tokenService.setToken(null);
    localStorageService.removeLocalStorage();
    setUser(null);
  }

  return (
    <button type="button" onClick={logout}>Logout</button>
  )
}

export default Logout;