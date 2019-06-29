import React from 'react';
import Person from './Person';

const Persons = ({ persons, setPersons, filter }) => {
  const filteredNumbers = persons.filter(person => {
    const namesMatch = person.name.toLowerCase().includes(filter);
    const numbersMatch = person.number.toLowerCase().includes(filter);

    return namesMatch || numbersMatch;
  });

  const numbers = () => filteredNumbers.map(person => {
    return (
      <Person 
      key={person.name} 
      person={person}
      persons={persons}
      setPersons={setPersons}
      />
    )
  }

  );

  return <ul>{numbers()}</ul>;
};

export default Persons;