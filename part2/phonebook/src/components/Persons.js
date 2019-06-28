import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter }) => {
  const filteredNumbers = persons.filter(person => {
    const namesMatch = person.name.toLowerCase().includes(filter);
    const numbersMatch = person.number.toLowerCase().includes(filter);

    return namesMatch || numbersMatch;
  });

  const numbers = () => filteredNumbers.map(person =>
    <Person key={person.name} name={person.name} number={person.number} />
  );

  return <ul>{numbers()}</ul>;
};

export default Persons;