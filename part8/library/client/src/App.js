import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`;

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
  }
}
`;

const ADD_BOOK = gql`
mutation createBook(
  $title: String!
  $published: Int!
  $author: String!
  $genres: [String!]!
) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    published
    author
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

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState('');

  const authorsData = useQuery(ALL_AUTHORS);
  const booksData = useQuery(ALL_BOOKS);

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => setErrorMessage(''), 10 * 1000);
  };

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
  });

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authors = authorsData.data.allAuthors;
  const books = booksData.data.allBooks;

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
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

    </div>
  );
};

export default App;
