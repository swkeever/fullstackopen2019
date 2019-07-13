/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useField } from '../hooks';
import { setFailureNotification, setSuccessNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const CreateBlog = (props) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('url');

  const inputProps = ['value', 'type', 'onChange'];
  const titleProps = _.pick(title, inputProps);
  const authorProps = _.pick(author, inputProps);
  const urlProps = _.pick(url, inputProps);

  const createNewBlog = async () => {
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      await props.createBlog(blog);
      props.setSuccessNotification(`New blog, ${blog.title} by ${blog.author} was created`);
    } catch (exception) {
      props.setFailureNotification(`Create blog failed: ${exception.message}`);
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
          onClick={createNewBlog}
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
  createBlog: PropTypes.func.isRequired,
  setSuccessNotification: PropTypes.func.isRequired,
  setFailureNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createBlog,
  setSuccessNotification,
  setFailureNotification,
};

export default connect(null, mapDispatchToProps)(CreateBlog);
