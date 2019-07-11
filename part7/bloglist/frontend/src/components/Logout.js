import React from 'react';
import PropTypes from 'prop-types';
import tokenService from '../utils/token';
import localStorageService from '../utils/local_storage';

const Logout = ({ setUser }) => {
  const logout = () => {
    tokenService.setToken(null);
    localStorageService.removeLocalStorage();
    setUser(null);
  };

  return (
    <button type="button" onClick={logout}>Logout</button>
  );
};

Logout.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Logout;
