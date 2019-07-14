import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Login from './components/Login';
import { initializeUser } from './reducers/userReducer';
import propTypesHelper from './utils/proptypes';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import RouteContainer from './components/RouteContainer';
import Blogs from './components/Blogs';
import Notification from './components/Notification';

const App = ({
  user,
  users,
  blogs,
  initializeBlogs,
  initializeUser,
  initializeUsers,
}) => {
  useEffect(() => {
    initializeUser();
    initializeBlogs();
    initializeUsers();
  }, [initializeUser, initializeBlogs, initializeUsers]);

  const userById = id => users.find(u => u.id === id);
  const blogById = id => blogs.find(b => b.id === id);

  if (!user) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <Container>
      <Router>
        <RouteContainer>
          <Route exact path="/" render={() => <Blogs />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route
            exact
            path="/users/:id"
            render={({ match }) => <User user={userById(match.params.id)} />}
          />
          <Route
            exact
            path="/blogs/:id"
            render={({ match }) => <Blog blog={blogById(match.params.id)} />}
          />
        </RouteContainer>
      </Router>
    </Container>
  );
};

App.defaultProps = {
  user: null,
};

App.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape(propTypesHelper.BLOG)).isRequired,
  user: PropTypes.shape(propTypesHelper.USER),
  users: PropTypes.arrayOf(PropTypes.shape(propTypesHelper.USER)).isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  initializeUser: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user, users, blogs }) => ({
  user,
  users,
  blogs,
});

const mapDispatchToProps = {
  initializeUser,
  initializeBlogs,
  initializeUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
