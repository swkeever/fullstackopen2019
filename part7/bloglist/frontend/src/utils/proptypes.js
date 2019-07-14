import PropTypes from 'prop-types';

const USER = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string,
  id: PropTypes.string,
};

const COMMENT = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const BLOG = {
  likes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.shape(USER).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(COMMENT)).isRequired,
  id: PropTypes.string.isRequired,
};

const NOTIFICATION = {
  message: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
};

export default {
  BLOG,
  NOTIFICATION,
  USER,
};
