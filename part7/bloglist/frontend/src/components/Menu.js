import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import propTypesHelper from '../utils/proptypes';
import { clearUser } from '../reducers/userReducer';

const Header = ({ user, clearUser }) => {
  const [activeItem, setActiveItem] = useState('blogs');

  const logout = () => {
    clearUser();
  };

  return (
    <Menu pointing>
      <Menu.Item header>Blog App</Menu.Item>
      <Menu.Item name="blogs" active={activeItem === 'blogs'} onClick={() => setActiveItem('blogs')} as={Link} to="/">
        Blogs
      </Menu.Item>
      <Menu.Item name="users" active={activeItem === 'users'} onClick={() => setActiveItem('users')} as={Link} to="/users">
        Users
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="my-profile" active={activeItem === 'my-profile'} onClick={() => setActiveItem('my-profile')} as={Link} to={`/users/${user.id}`}>
          <Icon name="user" />
          {user.name}
        </Menu.Item>
        <Menu.Item name="logout" onClick={logout}>
        Logout
        </Menu.Item>
      </Menu.Menu>


    </Menu>
  );
};

Header.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER).isRequired,
};


const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  clearUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
