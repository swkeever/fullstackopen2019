import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Header } from 'semantic-ui-react';
import propTypesHelper from '../utils/proptypes';
import Togglable from './Togglable';
import CreateBlog from './CreateBlog';

const Blogs = ({ blogs }) => {
  const showBlogs = () => {
    const byLikes = (a, b) => b.likes - a.likes;
    const sortedBlogs = [...blogs].sort(byLikes);

    const blogsDisplay = sortedBlogs.map((blog, index) => (
      <Table.Row key={blog.id || `blog-${index}`}>
        <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
        <Table.Cell>{blog.author}</Table.Cell>
        <Table.Cell>{blog.user && <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>}</Table.Cell>
      </Table.Row>
    ));

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Posted by</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {blogsDisplay}
        </Table.Body>
      </Table>
    );
  };

  return (
    <div className="blogs">
      <Header as="h2">Blogs</Header>
      <Togglable buttonLabel="Create Blog">
        <CreateBlog />
      </Togglable>
      {showBlogs()}
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape(propTypesHelper.BLOG)).isRequired,
};

const mapStateToProps = ({ user, blogs }) => ({
  user,
  blogs,
});


export default connect(mapStateToProps)(Blogs);
