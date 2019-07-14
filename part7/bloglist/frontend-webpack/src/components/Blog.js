import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
        <Header as="h2">
          {blog.title}
          <Header.Subheader>{blog.author}</Header.Subheader>
        </Header>

      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div className="likes">
        <Button
          color="red"
          content="Like"
          icon="heart"
          label={{
            basic: true, color: 'red', pointing: 'left', content: blog.likes,
          }}
          onClick={handleNewLike}
        />
      </div>
      <Header sub>
        Added by
        {' '}
        <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </Header>
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
