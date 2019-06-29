import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const defaultState = '';
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(defaultState);
  const [newNumber, setNewNumber] = useState(defaultState);
  const [filter, setFilter] = useState(defaultState);

  useEffect(() => {
    personsService
      .getAllPersons()
      .then(persons => {
        setPersons(persons);
      });
  }, []);

  const addNewContact = (event) => {
    event.preventDefault();

    const foundPerson = persons.find(person => person.name === newName);

    if (foundPerson) {
      const updatePerson = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

      if (!updatePerson) {
        return;
      }

      const updatedPerson = {
        ...foundPerson,
        number: newNumber
      };

      personsService
        .updatePerson(updatedPerson)
        .then(res => {
          setPersons(persons.map(p => (p.id === foundPerson.id) ? res : p));
        });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personsService
        .createPerson(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
        });
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
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
      />
    </div>
  )
}

export default App