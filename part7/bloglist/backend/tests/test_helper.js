const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

const root = {
  username: 'root',
  password: 'secret',
  name: 'Root Johnson',
};

let token;

const setupUserDB = async () => {
  await User.deleteMany({});
  await api
    .post('/api/users')
    .send(root);
};

const getToken = () => token;

const loginAsRoot = async () => {
  const response = await api
    .post('/api/login')
    .send(root);

  token = `bearer ${response.body.token}`;
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

const removeIds = (blogs) => {
  const blogsWithoutIds = blogs.map((blog) => {
    const withoutId = { ...blog };
    delete withoutId.id;
    return withoutId;
  });

  return blogsWithoutIds;
};


module.exports = {
  blogsInDB,
  removeIds,
  usersInDB,
  setupUserDB,
  loginAsRoot,
  getToken,
};
