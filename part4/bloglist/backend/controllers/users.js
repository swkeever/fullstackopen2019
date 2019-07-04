const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    const minLength = 3;

    if (body.username.length < minLength || body.password.length < minLength) {
      response
        .status(400)
        .json({ error: 'username and password must be >= 3 characters' });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash,
    });

    const savedUser = await user.save();

    response
      .status(200)
      .json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
        id: 1,
      });

    response
      .status(200)
      .json(users.map(user => user.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
