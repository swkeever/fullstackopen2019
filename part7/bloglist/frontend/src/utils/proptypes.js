import PropTypes from 'prop-types';

const BLOG = {
  likes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

const NOTIFICATION = {
  message: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
};

const USER = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default {
  BLOG,
  NOTIFICATION,
  USER,
};
