import axios from 'axios'
import tokenService from '../utils/token';
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: tokenService.getToken(),
    }
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

export default { 
  getAll,
  createBlog,
}