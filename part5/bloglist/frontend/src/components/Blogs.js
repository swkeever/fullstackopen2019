import React, { useState, useEffect } from 'react'
import Blog from './Blog';
import blogsService from '../services/blogs';
import tokenService from '../utils/token';
import Logout from './Logout';
import CreateBlog from './CreateBlog';
import Togglable from './Togglable';

const Blogs = ({
  user, setUser,
  setNotification,
}) => {
  const [blogs, setBlogs] = useState([]);
  const [clicked, setClicked] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  const showBlogs = () => {
    console.log(clicked)
    const blogsDisplay = blogs.map((blog, index) => (
      <Blog
        key={blog.id}
        blog={blog}
        clicked={clicked}
        setClicked={setClicked}
        indexOf={index}
      />
    ));

    return blogsDisplay;
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in
        <Logout
          setUser={setUser}
        />
      </p>
      {showBlogs()}
    </div>
  );
}

export default Blogs;