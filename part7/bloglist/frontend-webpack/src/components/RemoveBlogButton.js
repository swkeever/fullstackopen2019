/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import propTypesHelper from '../utils/proptypes';
import { setSuccessNotification, setFailureNotification } from '../reducers/notificationReducer';
import { removeBlog } from '../reducers/blogReducer';

const RemoveBlogButton = (props) => {
  const { blog, user } = props;

  const handleRemoveBlog = async () => {
    const asksToRemove = window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`);

    if (!asksToRemove) {
      return;
    }

    try {
      await props.removeBlog(blog);
      props.setSuccessNotification(`${blog.title} was removed.`);
    } catch (excpetion) {
      props.setFailureNotification(`Something happened: ${excpetion.message}`);
    }
  };

  const isMyBlog = user
    && blog.user
    && user.username === blog.user.username;

  if (!isMyBlog) {
    return null;
  }

  return (
    <Button content="Delete" icon="trash" type="button" onClick={handleRemoveBlog} />
  );
};

RemoveBlogButton.defaultProps = {
  user: null,
};

RemoveBlogButton.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER),
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
  setSuccessNotification: PropTypes.func.isRequired,
  setFailureNotification: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  setFailureNotification,
  setSuccessNotification,
  removeBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveBlogButton);
