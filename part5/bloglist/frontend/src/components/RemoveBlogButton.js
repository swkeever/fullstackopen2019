/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import blogsService from '../services/blogs';
import notificationHelper from '../utils/notification';
import localStorageHelper from '../utils/local_storage';
import propTypesHelper from '../utils/proptypes';

const RemoveBlogButton = ({ blog, setNotification }) => {
  const removeBlog = async () => {
    const asksToRemove = window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`);

    if (!asksToRemove) {
      return;
    }

    try {
      await blogsService.removeBlog(blog);
      const notification = notificationHelper
        .createNotification(
          `${blog.title} was removed.`,
          notificationHelper.SUCCESS,
        );
      notificationHelper.changeNotification(notification, setNotification);
    } catch (excpetion) {
      const notification = notificationHelper
        .createNotification(
          `Something happened: ${excpetion.message}`,
          notificationHelper.ERROR,
        );
      notificationHelper.changeNotification(notification, setNotification);
    }
  };

  const loggedInUser = localStorageHelper.getLocalStorage();

  const isMyBlog = loggedInUser
    && blog.user
    && loggedInUser.username === blog.user.username;

  if (!isMyBlog) {
    return null;
  }

  return (
    <div>
      <button type="button" onClick={removeBlog}>Remove</button>
    </div>
  );
};

RemoveBlogButton.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default RemoveBlogButton;
