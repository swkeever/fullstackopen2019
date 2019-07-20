import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

const FILTER_BOOKS = gql`
query allBooksWithFilter($filter: String!) {
  allBooks(genre: $filter) {
    title
    author {
      name
    }
    id
    published
  }
}
`;

const FilteredBooks = ({ genre }) => {
  const booksData = useQuery(FILTER_BOOKS, {
    variables: {
      filter: genre,
    },
    fetchPolicy: 'no-cache',
  });

  console.log(booksData.data.allBooks);
  const books = booksData.data.allBooks;

  if (_.isEmpty(books)) {
    return null;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
          author
            </th>
            <th>
          published
            </th>
          </tr>

          {books.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default FilteredBooks;
