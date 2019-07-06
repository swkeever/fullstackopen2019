import React from 'react';
import PropTypes from 'prop-types';
import blogsService from '../services/blogs';
import notificationHelper from '../utils/notification';
import { useField } from '../hooks';
import _ from 'lodash';

const CreateBlog = ({ setNotification }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('url');

  const inputProps = ['value', 'type', 'onChange'];
  const titleProps = _.pick(title, inputProps);
  const authorProps = _.pick(author, inputProps);
  const urlProps = _.pick(url, inputProps);

  const createBlog = async () => {
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      await blogsService.createBlog(blog);

      const notification = notificationHelper.createNotification(`New blog, ${blog.title} by ${blog.author} was created`, notificationHelper.SUCCESS);
      notificationHelper.changeNotification(notification, setNotification);
    } catch (exception) {
      const notification = notificationHelper.createNotification(`Create blog failed: ${exception.message}`, notificationHelper.ERROR);
      notificationHelper.changeNotification(notification, setNotification);
    }
  };

  const resetForm = () => {
    const asksToReset = window.confirm('Are you sure you want to cancel this blog post?');

    if (!asksToReset) {
      return;
    }

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <div>
        <label htmlFor="new-blog-title">
          Title:
          <input
            {...titleProps}
            id="new-blog-title"
            name="blog_title"
          />
        </label>
      </div>
      <div>
        <label htmlFor="new-blog-author">
          Author:
          <input
            {...authorProps}
            id="new-blog-author"
            name="blog_author"
          />
        </label>
      </div>
      <div>
        <label htmlFor="new-blog-url">
          URL:
          <input
            {...urlProps}
            id="new-blog-url"
            name="blog_url"
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={createBlog}
        >
          Create
        </button>
        <button
          type="button"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

CreateBlog.propTypes = {
  setNotification: PropTypes.func.isRequired,
};

export default CreateBlog;
