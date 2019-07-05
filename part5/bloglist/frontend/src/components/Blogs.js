import React, { useState, useEffect } from 'react'
import Blog from './Blog';
import blogsService from '../services/blogs';
import tokenService from '../services/token';

const Blogs = ({
  user, setUser
}) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);


  const showBlogs = () => {
    console.log('showBlogs:', blogs);
    return blogs.map(blog => (
      <Blog
        blog={blog}
      />
    ));
  }

  const showLogout = () => {
    const logout = () => {
      tokenService.setToken(null);
      setUser(null);
    }

    return (
      <button type="button" onClick={logout}>Logout</button>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in
      </p>
      {showBlogs()}
      <p>{showLogout()}</p>
    </div>
  );
}

export default Blogs;