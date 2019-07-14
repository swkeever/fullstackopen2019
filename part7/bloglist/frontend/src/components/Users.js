import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import propTypesHelper from '../utils/proptypes';

const Users = ({ users }) => (
  <div>
    <h2>Users</h2>
    <table>
      <tbody>
        <tr>
          <th>
        Name
          </th>
          <th>
        Blogs Created
          </th>
        </tr>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(propTypesHelper.USER)).isRequired,
};

const orderedUsers = (users) => {
  const usersSorted = Array.from(users);
  const byBlogsCreated = (a, b) => b.blogs.length - a.blogs.length;
  usersSorted.sort(byBlogsCreated);
  return usersSorted;
};

const mapStateToProps = ({ users }) => ({ users: orderedUsers(users) });

export default connect(mapStateToProps)(Users);
