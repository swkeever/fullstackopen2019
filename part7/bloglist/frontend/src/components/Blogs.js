import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Blog from './Blog';
import Logout from './Logout';
import propTypesHelper from '../utils/proptypes';

const Blogs = (props) => {
  const showBlogs = () => {
    const byLikes = (a, b) => b.likes - a.likes;

    const sortedBlogs = [...props.blogs].sort(byLikes);

    const blogsDisplay = sortedBlogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
      />
    ));

    return blogsDisplay;
  };

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <p>
        {props.user.name}
        {' '}
        logged in
        <Logout />
      </p>
      {showBlogs()}
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape(propTypesHelper.BLOG)).isRequired,
};

const mapStateToProps = ({ user, blogs }) => ({
  user,
  blogs,
});


export default connect(mapStateToProps)(Blogs);
