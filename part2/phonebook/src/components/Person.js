import React from 'react';
import personsService from '../services/persons';

const Person = ({ person, persons, setPersons }) => {
  const handleClick = (person) => {
    const deleteConfirmed = window.confirm(`Delete ${person.name}?`);

    if (!deleteConfirmed) {
      return;
    }

    personsService
    .deletePerson(person)
    .then(res => {
      setPersons(persons.filter(p => p.id !== person.id));
    })
  }

  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => handleClick(person)}>delete</button>
    </li>
  );
}

export default Person;