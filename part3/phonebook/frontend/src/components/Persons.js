import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleDelete, filter }) => {
  const filteredNumbers = persons.filter(person => {
    const namesMatch = person.name.toLowerCase().includes(filter);
    const numbersMatch = person.number.toLowerCase().includes(filter);

    return namesMatch || numbersMatch;
  });

  const numbers = () => filteredNumbers.map(person => {
    return (
      <Person
        key={person.id}
        person={person}
        handleDelete={handleDelete}
      />
    )
  }

  );

  return <ul>{numbers()}</ul>;
};

export default Persons;