import React from 'react';
import PropTypes from 'prop-types';
import propTypesHelper from '../utils/proptypes';

const User = ({ user }) => {
  const usersBlogs = () => user.blogs.map(blog => (
    <li key={blog.id}>
      {blog.title}
    </li>
  ));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs added</h3>
      <ul>
        {usersBlogs()}
      </ul>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER).isRequired,
};

export default User;
