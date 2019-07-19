import React, { useState, useEffect, useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { AuthorsContext } from '../App';

const Authors = (props) => {
  const { show, editBorn } = props;

  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const authors = useContext(AuthorsContext);

  useEffect(() => {
    const initialName = authors.length ? authors[0].name : '';
    setName(initialName);
  }, [authors]);

  if (!show || !authors) {
    return null;
  }

  const updateAuthor = async (event) => {
    event.preventDefault();

    await editBorn({
      variables: {
        name,
        setBornTo: Number(year),
      },
    });

    setName('');
    setYear('');
  };

  const showSetBirthyear = () => {
    const options = () => authors.map(a => (
      <option
        key={a.name}
        value={a.name}
      >
        {a.name}
      </option>
    ));

    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={updateAuthor}>
          <div>
          name
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {options()}
            </select>
          </div>
          <div>
          born
            <input type="number" value={year} onChange={({ target }) => setYear(target.value)} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {authors && showSetBirthyear()}

    </div>
  );
};

export default Authors;
