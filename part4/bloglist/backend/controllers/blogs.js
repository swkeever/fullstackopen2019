const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
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
    await Blog.findByIdAndRemove(request.params.id);
    response
      .status(200)
      .end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
