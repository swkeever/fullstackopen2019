import React, { useState } from 'react'
import BlogExpandedView from './BlogExpandedView';
import BlogLimitedView from './BlogLimitedView';

const Blog = ({ blog, clicked, setClicked, indexOf }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    const clickedCopy = Array.from(clicked);
    clickedCopy[indexOf] = !clickedCopy[indexOf];
    setClicked(clickedCopy);
  }

  return (
    <div
      style={blogStyle}
      onClick={handleClick}
    >
      {clicked[indexOf] ? <BlogExpandedView blog={blog} /> : <BlogLimitedView blog={blog} />}
    </div>

  );
};

export default Blog