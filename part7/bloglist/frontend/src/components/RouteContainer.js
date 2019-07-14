import React from 'react';
import Header from './Header';
import Notification from './Notification';

const RouteContainer = ({ children }) => (
  <>
    <Header />
    <Notification />
    {children}
  </>
);

export default RouteContainer;
