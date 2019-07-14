import axios from 'axios';
import tokenService from '../utils/token';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const commentOnBlog = async (blog, content) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { content }, authorize());
  return response.data;
};

const authorize = () => ({
  headers: {
    Authorization: tokenService.getToken(),
  },
});

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, authorize());
  return response.data;
};

const getBlogRoute = blog => `${baseUrl}/${blog.id}`;

const likeBlog = async (blog) => {
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };

  const response = await axios.put(getBlogRoute(blog), likedBlog, authorize());
  return response.data;
};

const removeBlog = async (blog) => {
  const response = await axios.delete(getBlogRoute(blog), authorize());
  return response.data;
};

export default {
  getAll,
  createBlog,
  likeBlog,
  removeBlog,
  commentOnBlog,
};
