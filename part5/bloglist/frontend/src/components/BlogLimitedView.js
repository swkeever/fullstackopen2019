import React from 'react';

const BlogLimitedView = ({ blog }) => (
  <div>
    <strong>{blog.title}</strong> by {blog.author}
  </div>
);

export default BlogLimitedView;