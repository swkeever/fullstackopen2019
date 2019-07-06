import React from 'react';
import PropTypes from 'prop-types';
import propTypesHelper from '../utils/proptypes';

const BlogLimitedView = ({ blog, clicked, setClicked }) => {
  const handleKeyDown = (event) => {
    const { key } = event;

    if (key === 'ArrowRight') {
      setClicked(true);
    } else if (key === 'ArrowLeft') {
      setClicked(false);
    } else if (key === ' ') {
      setClicked(!clicked);
    }
  };

  return (
    <div
      role="button"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={() => setClicked(!clicked)}
    >
      <strong>{blog.title}</strong>
      {` by ${blog.author}`}
    </div>
  );
};

BlogLimitedView.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
  clicked: PropTypes.bool.isRequired,
  setClicked: PropTypes.func.isRequired,
};

export default BlogLimitedView;
