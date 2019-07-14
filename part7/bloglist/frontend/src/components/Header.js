import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import propTypesHelper from '../utils/proptypes';

const Header = props => (
  <div>
    <Link to="/">Blogs</Link>
    <Link to="/users">Users</Link>
    {`${props.user.name} logged in`}
    <Logout />
  </div>
);

Header.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER).isRequired,
};


const mapStateToProps = ({ user }) => ({ user });


export default connect(mapStateToProps)(Header);
