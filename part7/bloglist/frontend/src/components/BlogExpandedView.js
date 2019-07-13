import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BlogLimitedView from './BlogLimitedView';
import localStorageHelper from '../utils/local_storage';
import RemoveBlogButton from './RemoveBlogButton';
import propTypesHelper from '../utils/proptypes';
import { likeBlog } from '../reducers/blogReducer';
import { setSuccessNotification, setFailureNotification } from '../reducers/notificationReducer';

const BlogExpandedView = (props) => {
  const { blog, clicked, setClicked } = props;

  const handleNewLike = async () => {
    try {
      props.likeBlog(blog);

      props.setSuccessNotification(`You liked ${blog.title}!`);
    } catch (exception) {
      props.setFailureNotification('Something happened. We weren\'t able to complete your request.');
    }
  };

  return (
    <>
      <BlogLimitedView
        blog={blog}
        clicked={clicked}
        setClicked={setClicked}
      />
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div className="likes">
        {blog.likes}
        {' '}
likes
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
      {
        blog.user === localStorageHelper.getLocalStorage()
      }
      <RemoveBlogButton
        blog={blog}
      />
    </>
  );
};

BlogExpandedView.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
  clicked: PropTypes.bool.isRequired,
  setClicked: PropTypes.func.isRequired,
  setSuccessNotification: PropTypes.func.isRequired,
  setFailureNotification: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setSuccessNotification,
  setFailureNotification,
  likeBlog,
};

export default connect(null, mapDispatchToProps)(BlogExpandedView);
