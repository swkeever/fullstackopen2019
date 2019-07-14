/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

    if (!user || !passwordCorrect) {
      response
        .status(401)
        .json({ error: 'invalid username or password' });
      return;
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({
        token, username: user.username, name: user.name, id: user.id,
      });
  } catch (exception) {
    next(exception);
  }
});

module.exports = loginRouter;
