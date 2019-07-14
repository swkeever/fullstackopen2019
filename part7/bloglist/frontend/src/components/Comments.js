import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header, Form, Button, List,
} from 'semantic-ui-react';
import propTypesHelper from '../utils/proptypes';
import { commentOnBlog } from '../reducers/blogReducer';
import { setSuccessNotification, setFailureNotification } from '../reducers/notificationReducer';

const Comments = ({
  blog, commentOnBlog, setSuccessNotification, setFailureNotification,
}) => {
  const [comment, setComment] = useState('');

  const showComments = () => {
    const comments = [...blog.comments];

    comments.sort((a, b) => new Date(b.date) - new Date(a.date));

    return comments.map(comment => (
      <List.Item key={comment.id}>
        {comment.content}
      </List.Item>
    ));
  };

  const handleSubmit = async (e) => {
    try {
      await commentOnBlog(blog, comment);
      setSuccessNotification('Comment posted!');
      setComment('');
    } catch (exception) {
      setFailureNotification('Comment post failed.');
    }
  };

  return (
    <div>
      <Header as="h3">Comments</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input value={comment} onChange={({ target }) => setComment(target.value)} type="text" />
        </Form.Field>
        <Button color="green" icon="comment" content="Add comment" type="submit" />
      </Form>
      <List bulleted>
        {showComments()}
      </List>

    </div>
  );
};

Comments.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
  commentOnBlog: PropTypes.func.isRequired,
  setFailureNotification: PropTypes.func.isRequired,
  setSuccessNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  commentOnBlog,
  setFailureNotification,
  setSuccessNotification,
};

export default connect(null, mapDispatchToProps)(Comments);
