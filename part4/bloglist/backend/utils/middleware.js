const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'ValidationError') {
    res.status(400).send({ error: err.message });
    return;
  } if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid token' });
    return;
  }

  next(err);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
