import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import localStorageHelper from '../utils/local_storage';
import RemoveBlogButton from './RemoveBlogButton';
import propTypesHelper from '../utils/proptypes';
import { likeBlog } from '../reducers/blogReducer';
import { setSuccessNotification, setFailureNotification } from '../reducers/notificationReducer';
import Comments from './Comments';

const Blog = (props) => {
  const { blog } = props;

  const handleNewLike = async () => {
    try {
      props.likeBlog(blog);

      props.setSuccessNotification(`You liked ${blog.title}!`);
    } catch (exception) {
      props.setFailureNotification('Something happened. We weren\'t able to complete your request.');
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <div>
        <h2>{`${blog.title} by ${blog.author}`}</h2>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div className="likes">
        {`${blog.likes} likes`}
        <button
          type="button"
          onClick={handleNewLike}
        >
          Like
        </button>
      </div>
      <div>
        Added by
        {' '}
        {blog.user ? blog.user.name : 'Unknown'}
      </div>
      <Comments blog={blog} />
      {
        blog.user === localStorageHelper.getLocalStorage()
      }
      <RemoveBlogButton
        blog={blog}
      />
    </>
  );
};

Blog.defaultProps = {
  blog: null,
};

Blog.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG),
  setSuccessNotification: PropTypes.func.isRequired,
  setFailureNotification: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setSuccessNotification,
  setFailureNotification,
  likeBlog,
};

export default connect(null, mapDispatchToProps)(Blog);
