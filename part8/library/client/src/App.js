import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from 'lodash';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';


const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`;

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
    }
    published
    id
  }
}
`;

const ADD_BOOK = gql`
mutation createBook(
  $title: String!
  $published: Int!
  $authorName: String!
  $genres: [String!]!
) {
  addBook(
    title: $title
    published: $published
    authorName: $authorName
    genres: $genres
  ) {
    title
    published
    author {
      name
      born
      id
      bookCount
    }
    genres
    id
  }
}
`;

const EDIT_BORN = gql`
mutation editBorn($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`;

const LOGIN = gql`
mutation login(
  $username: String!
  $password: String!
) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`;

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('library-user-token'));

  const authorsData = useQuery(ALL_AUTHORS);
  const booksData = useQuery(ALL_BOOKS);

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message);
    setTimeout(() => setErrorMessage(''), 10 * 1000);
  };

  const [login] = useMutation(LOGIN, {
    onError: handleError,
  });

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [
      {
        query: ALL_AUTHORS,
      },
      {
        query: ALL_BOOKS,
      },
    ],
    fetchPolicy: 'no-cache',
  });

  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-user-token');
    client.resetStore();
  };

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authors = _.isEmpty(authorsData.data.allAuthors) ? [] : authorsData.data.allAuthors;
  const books = _.isEmpty(booksData.data) ? [] : booksData.data.allBooks;

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <button type="button" onClick={() => setPage('authors')}>authors</button>
        <button type="button" onClick={() => setPage('books')}>books</button>
        {token && <button type="button" onClick={() => setPage('add')}>add book</button>}
        {token && <button type="button" onClick={logout}>logout</button>}
        {!token && <button type="button" onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
        editBorn={editBorn}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Login show={page === 'login'} setPage={setPage} login={login} setToken={setToken} />

    </div>
  );
};

export default App;
