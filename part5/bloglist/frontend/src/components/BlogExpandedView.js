import React from 'react';
import PropTypes from 'prop-types';
import BlogLimitedView from './BlogLimitedView';
import blogsService from '../services/blogs';
import notificationHelper from '../utils/notification';
import localStorageHelper from '../utils/local_storage';
import RemoveBlogButton from './RemoveBlogButton';
import propTypesHelper from '../utils/proptypes';

const BlogExpandedView = ({
  blog, clicked, setClicked, setNotification,
}) => {
  const handleNewLike = async () => {
    try {
      await blogsService.likeBlog(blog);

      const notification = notificationHelper
        .createNotification(
          `You liked ${blog.title}!`,
          notificationHelper.SUCCESS,
        );
      notificationHelper.changeNotification(notification, setNotification);
    } catch (exception) {
      const notification = notificationHelper
        .createNotification(
          'Something happened. We weren\'t able to complete your request.',
          notificationHelper.ERROR,
        );
      notificationHelper.changeNotification(notification, setNotification);
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
      <div>
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
        setNotification={setNotification}
      />
    </>
  );
};

BlogExpandedView.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
  clicked: PropTypes.bool.isRequired,
  setClicked: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default BlogExpandedView;
