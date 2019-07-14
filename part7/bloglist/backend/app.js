const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());

app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
