import React from 'react';
import PropTypes from 'prop-types';
import Header from './Menu';
import Notification from './Notification';

const RouteContainer = ({ children }) => (
  <>
    <Header />
    <Notification />
    {children}
  </>
);

RouteContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RouteContainer;
