import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearUser } from '../reducers/userReducer';

const Logout = (props) => {
  const logout = () => {
    props.clearUser();
  };

  return (
    <button type="button" onClick={logout}>Logout</button>
  );
};

Logout.propTypes = {
  clearUser: PropTypes.func.isRequired,
};

export default connect(null, { clearUser })(Logout);
