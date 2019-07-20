import React, { useState, useContext } from 'react';
import _ from 'lodash';
import FilteredBooks from './FilteredBooks';
import { BooksContext } from '../App'

const Books = (props) => {
  const [filter, setFilter] = useState('');

  const books = useContext(BooksContext);

  if (!props.show || !books) {
    return null;
  }

  const showFilters = () => {
    const allGenresWithDuplicates = [];

    books.forEach((book) => {
      const { genres } = book;

      genres.forEach((genre) => {
        allGenresWithDuplicates.push(genre);
      });
    });

    const allGenres = _.uniq(allGenresWithDuplicates);

    return allGenres.map(genre => (
      <button key={`${genre}-filter-button`} type="button" onClick={() => setFilter(genre)}>{genre}</button>
    )).concat(<button key="all-genres-button" type="button" onClick={() => setFilter('')}>All genres</button>);
  };

  return (
    <div>
      <h2>books</h2>
      <FilteredBooks
        genre={filter}
      />
      {showFilters()}
    </div>
  );
};

export default Books;
