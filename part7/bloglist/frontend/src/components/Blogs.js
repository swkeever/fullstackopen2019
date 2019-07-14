import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypesHelper from '../utils/proptypes';
import Togglable from './Togglable';
import CreateBlog from './CreateBlog';

const Blogs = (props) => {
  const showBlogs = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    };

    const byLikes = (a, b) => b.likes - a.likes;
    const sortedBlogs = [...props.blogs].sort(byLikes);

    const blogsDisplay = sortedBlogs.map(blog => (
      <div
        key={blog.id}
        style={blogStyle}
      >
        <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
      </div>
    ));

    return blogsDisplay;
  };


  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create Blog">
        <CreateBlog />
      </Togglable>
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
