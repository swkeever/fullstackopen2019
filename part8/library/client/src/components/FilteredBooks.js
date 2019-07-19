import React, { useContext } from 'react';
import { BooksContext } from '../App'

const FilteredBooks = ({ filter }) => {
  const books = useContext(BooksContext);
  const booksToShow = filter ? books.filter(b => b.genres.includes(filter)) : books;

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
          {booksToShow.map(a => (
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
