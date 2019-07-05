import React, { useState } from 'react';
import formHelper from '../utils/form_helper';
import blogsService from '../services/blogs';
import notificationHelper from '../utils/notification';

const CreateBlog = ({ setNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = async () => {
    const blog = {
      title,
      author,
      url,
    }

    try {
      await blogsService.createBlog(blog);

      const notification = notificationHelper.createNotification(`New blog, ${blog.title} by ${blog.author} was created`, notificationHelper.SUCCESS);
      notificationHelper.setNotification(notification, setNotification);
    } catch (exception) {
      const notification = notificationHelper.createNotification(`Create blog failed: ${exception.message}`, notificationHelper.ERROR);
      notificationHelper.setNotification(notification, setNotification);
    }
  }

  return (
    <div>
      <h2>Create Blog</h2>
      <div>
        <label htmlFor="new-blog-title">
          Title:
          <input
            type="text"
            id="new-blog-title"
            name="blog_title"
            onChange={({ target }) => formHelper.handleChange(target.value, setTitle)}
            value={title}
          />
        </label>
      </div>
      <div>
        <label htmlFor="new-blog-author">
          Author:
          <input
            type="text"
            id="new-blog-author"
            name="blog_author"
            onChange={({ target }) => formHelper.handleChange(target.value, setAuthor)}
            value={author}
          />
        </label>
      </div>
      <div>
        <label htmlFor="new-blog-url">
          URL:
          <input
            type="url"
            id="new-blog-url"
            name="blog_url"
            onChange={({ target }) => formHelper.handleChange(target.value, setUrl)}
            value={url}
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
      </div>
    </div>
  );
};

export default CreateBlog;