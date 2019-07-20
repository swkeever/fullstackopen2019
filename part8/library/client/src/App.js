import React, { useState } from 'react';
import {
  useQuery, useMutation, useSubscription, useApolloClient,
} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from 'lodash';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';


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

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  author {
    name
    born
    bookCount
    id
  }
  published
  genres
  id
}
`;

const ALL_BOOKS = gql`
{
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
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
    ...BookDetails
  }
}
${BOOK_DETAILS}
`;

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
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

const ME = gql`
{
  me {
    username
    favoriteGenre
    id
  }
}
`;

export const UserContext = React.createContext();
export const AuthorsContext = React.createContext();
export const BooksContext = React.createContext();

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('library-user-token'));

  const authorsData = useQuery(ALL_AUTHORS);
  const booksData = useQuery(ALL_BOOKS);
  const userData = useQuery(ME);

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message);
    setTimeout(() => setErrorMessage(''), 10 * 1000);
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook);
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore,
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      // eslint-disable-next-line no-alert
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  const [login] = useMutation(LOGIN, {
    onError: handleError,
  });

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => updateCacheWith(response.data.addBook),
    refetchQueries: [
      {
        query: ALL_AUTHORS,
      },
    ],
    
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
  const user = _.isEmpty(userData.data) ? null : userData.data.me;

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <button type="button" onClick={() => setPage('authors')}>authors</button>
        <button type="button" onClick={() => setPage('books')}>books</button>
        {token && <button type="button" onClick={() => setPage('add')}>add book</button>}
        {token && <button type="button" onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button type="button" onClick={logout}>logout</button>}
        {!token && <button type="button" onClick={() => setPage('login')}>login</button>}
      </div>

      <AuthorsContext.Provider value={authors}>
        <Authors
          show={page === 'authors'}
          editBorn={editBorn}
        />
      </AuthorsContext.Provider>


      <BooksContext.Provider value={books}>
        <Books
          show={page === 'books'}
        />
      </BooksContext.Provider>


      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <UserContext.Provider value={user}>
        <BooksContext.Provider value={books}>
          <Recommend
            show={page === 'recommend'}
          />
        </BooksContext.Provider>
      </UserContext.Provider>


      <Login show={page === 'login'} setPage={setPage} login={login} setToken={setToken} />

    </div>
  );
};

export default App;
