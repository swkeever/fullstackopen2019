import React from 'react';
import BlogLimitedView from './BlogLimitedView';

const BlogExpandedView = ({ blog }) => {
  const handleNewLike = () => {
    console.log('liked')
  }

  return (
    <>
      <BlogLimitedView blog={blog} />
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button
          type="button"
          onClick={handleNewLike}
        >
          Like
        </button>
      </div>
      <div>
        Added by {blog.user ? blog.user.name : `Unknown`}
      </div>
    </>
  );
}

export default BlogExpandedView;