const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);
app.use(middleware.errorHandler);


module.exports = app;
