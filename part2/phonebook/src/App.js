import React, { useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const defaultState = '';
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState(defaultState);
  const [newNumber, setNewNumber] = useState(defaultState);
  const [filter, setFilter] = useState(defaultState);



  const addNewContact = (event) => {
    event.preventDefault();

    const names = persons.map(person => person.name);

    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      setPersons(persons.concat(newPerson));
    }

    setNewName(defaultState);
    setNewNumber(defaultState);
  };

  const handleChange = (mutatorFunction, newValue) => {
    mutatorFunction(newValue);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} handleChange={handleChange} />

      <h3>add a new</h3>
      <PersonForm
        addNewContact={addNewContact}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleChange={handleChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App