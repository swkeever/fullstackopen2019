/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', {
        username: 1,
        name: 1,
        id: 1,
      });

    response.json(blogs.map(blog => blog.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      response
        .status(401)
        .json({ error: 'token missing or invalid' });
      return;
    }

    const user = await User.findById(decodedToken.id);

    // TODO: should body.likes be set to 0?
    const blog = new Blog({
      ...body,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { body } = request;

    const blog = {
      author: body.author,
      likes: body.likes,
      title: body.title,
      url: body.url,
    };

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response
      .status(200)
      .send(result.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    const blogUserId = blog.user ? blog.user.toString() : null;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id || blogUserId !== decodedToken.id.toString()) {
      response
        .status(401)
        .send({ error: 'token missing or invalid' });
      return;
    }

    await Blog.findByIdAndRemove(request.params.id);

    response
      .status(200)
      .end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
