/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { useField } from '../hooks';
import { setFailureNotification, setSuccessNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import propTypesHelper from '../utils/proptypes';

const CreateBlog = (props) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('url');

  const inputProps = ['value', 'type', 'onChange'];
  const titleProps = _.pick(title, inputProps);
  const authorProps = _.pick(author, inputProps);
  const urlProps = _.pick(url, inputProps);

  const createNewBlog = async (e) => {
    e.preventDefault();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      comments: [],
      user: props.user,
      likes: 0,
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
      <Form>
        <Form.Field>
          <label htmlFor="new-blog-title">
Title
            <input
              {...titleProps}
              id="new-blog-title"
              name="blog_title"
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="new-blog-author">
Author
            <input
              {...authorProps}
              id="new-blog-author"
              name="blog_author"
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="new-blog-url">
URL
            <input
              {...urlProps}
              id="new-blog-url"
              name="blog_url"
            />
          </label>
        </Form.Field>
        <Button
          icon="check"
          color="green"
          content="Create"
          type="button"
          onClick={createNewBlog}
        />
        <Button
          color="yellow"
          icon="undo"
          type="button"
          onClick={resetForm}
          content="Reset"
        />
      </Form>
    </div>
  );
};

CreateBlog.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER).isRequired,
  createBlog: PropTypes.func.isRequired,
  setSuccessNotification: PropTypes.func.isRequired,
  setFailureNotification: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  createBlog,
  setSuccessNotification,
  setFailureNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);
