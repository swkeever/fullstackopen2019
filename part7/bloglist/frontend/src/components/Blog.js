import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BlogExpandedView from './BlogExpandedView';
import BlogLimitedView from './BlogLimitedView';
import propTypesHelper from '../utils/proptypes';

const Blog = ({ blog }) => {
  const [clicked, setClicked] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      {
        clicked
          ? (
            <BlogExpandedView
              blog={blog}
              clicked={clicked}
              setClicked={setClicked}
            />
          )
          : (
            <BlogLimitedView
              blog={blog}
              clicked={clicked}
              setClicked={setClicked}
            />
          )
      }
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape(propTypesHelper.BLOG).isRequired,
};

export default Blog;
