/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Header } from 'semantic-ui-react';
import propTypesHelper from '../utils/proptypes';
import { initializeUsers } from '../reducers/usersReducer';

const Users = ({ users, initializeUsers }) => {
  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  return (
    <div>
      <Header as="h2">Users</Header>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>
        Name
            </Table.HeaderCell>
            <Table.HeaderCell>
        Blogs Created
            </Table.HeaderCell>
          </Table.Row>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(propTypesHelper.USER)).isRequired,
  initializeUsers: PropTypes.func.isRequired,
};

const orderedUsers = (users) => {
  const usersSorted = Array.from(users);
  const byBlogsCreated = (a, b) => b.blogs.length - a.blogs.length;
  usersSorted.sort(byBlogsCreated);
  return usersSorted;
};

const mapStateToProps = ({ users }) => ({ users: orderedUsers(users) });

const mapDispatchToProps = {
  initializeUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
