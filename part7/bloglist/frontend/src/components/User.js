import React from 'react';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import propTypesHelper from '../utils/proptypes';

const User = ({ user }) => {
  const usersBlogs = () => user.blogs.map(blog => (
    <List.Item key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </List.Item>
  ));

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header as="h2">{user.name}</Header>
      <Header as="h3">Blogs added</Header>
      <List>
        {usersBlogs()}
      </List>
    </div>
  );
};

User.defaultProps = {
  user: null,
};

User.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER),
};

export default User;
