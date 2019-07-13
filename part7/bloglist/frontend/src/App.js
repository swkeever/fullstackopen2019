import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './components/Login';
import Blogs from './components/Blogs';
import Notification from './components/Notification'; import Togglable from './components/Togglable';
import CreateBlog from './components/CreateBlog';
import { initializeUser } from './reducers/userReducer';
import propTypesHelper from './utils/proptypes';
import { initializeBlogs } from './reducers/blogReducer';

const App = ({
  user,
  initializeBlogs,
  initializeUser,
}) => {
  useEffect(() => {
    initializeUser();
    initializeBlogs();
  }, [initializeUser, initializeBlogs]);

  const showBlogsRef = React.createRef();

  const showNotLoggedInView = () => (
    <Login />
  );

  const showLoggedInView = () => {
    if (showBlogsRef.current) {
      showBlogsRef.current.toggleVisibility();
    }

    return (
      <>
        <Togglable buttonLabel="Create Blog">
          <CreateBlog />
        </Togglable>
        <Blogs />
      </>
    );
  };

  return (
    <>
      <Notification />
      {user ? showLoggedInView() : showNotLoggedInView()}
    </>
  );
};

App.defaultProps = {
  user: null,
};

App.propTypes = {
  user: PropTypes.shape(propTypesHelper.USER),
  initializeBlogs: PropTypes.func.isRequired,
  initializeUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  initializeUser,
  initializeBlogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
