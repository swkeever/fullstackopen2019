import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import blogsService from '../services/blogs';
import Logout from './Logout';
import propTypesHelper from '../utils/proptypes';

const Blogs = ({
  user, setUser,
  setNotification,
}) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogsService.getAll();
      setBlogs(fetchedBlogs);
    };
    fetchBlogs();
  }, []);

  const showBlogs = () => {
    const byLikes = (a, b) => b.likes - a.likes;

    const sortedBlogs = [...blogs].sort(byLikes);

    const blogsDisplay = sortedBlogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        setNotification={setNotification}
      />
    ));

    return blogsDisplay;
  };

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <p>
        {user.name}
        {' '}
        logged in
        <Logout
          setUser={setUser}
        />
      </p>
      {showBlogs()}
    </div>
  );
};

Blogs.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER).isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Blogs;
