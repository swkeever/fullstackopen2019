import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import propTypesHelper from '../utils/proptypes';
import { commentOnBlog } from '../reducers/blogReducer';

const Comments = ({ blog, commentOnBlog }) => {
  const [comment, setComment] = useState('');

  const showComments = () => {
    const comments = [...blog.comments];

    comments.sort((a, b) => new Date(b.date) - new Date(a.date));

    return comments.map(comment => (
      <li key={comment.id}>
        {comment.content}
      </li>
    ));
  };

  const handleSubmit = async (e) => {
    commentOnBlog(blog, comment);
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input value={comment} onChange={({ target }) => setComment(target.value)} type="text" />
        <button type="submit">Add comment</button>
      </form>
      {showComments()}
    </div>
  );
};

Comments.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
  commentOnBlog: PropTypes.func.isRequired,
};

const mapPropsToState = {
  commentOnBlog,
};

export default connect(null, mapPropsToState)(Comments);
