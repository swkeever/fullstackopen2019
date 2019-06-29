import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import './index.css';

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null;
  }

  return (
    <div className={`notification ${notification.class}`}>
      {notification.message}
    </div>
  );
}

const App = () => {
  const defaultState = '';
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(defaultState);
  const [newNumber, setNewNumber] = useState(defaultState);
  const [filter, setFilter] = useState(defaultState);
  const [notification, setNotification] = useState({
    message: '',
    class: ''
  });

  const handleDelete = (person) => {
    const deleteConfirmed = window.confirm(`Delete ${person.name}?`);

    if (!deleteConfirmed) {
      return;
    }

    personsService
      .deletePerson(person)
      .then(_ => {
        const newNotification = {
          message: `Deleted ${person.name}`,
          class: "success"
        };

        changeNotification(newNotification);

        setPersons(persons.filter(p => p.id !== person.id));
      })
      .catch(err => {
        const newNotification = {
          message: `Information of ${person.name} has already been removed from server`,
          class: 'error'
        };

        changeNotification(newNotification);
      });
  }

  const changeNotification = (notification) => {
    setNotification(notification);

    setTimeout(() => {
      setNotification({
        ...notification,
        message: ''
      });
    }, 5000);
  }

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

          const newNotification = {
            message: `Updated contact information for ${updatedPerson.name}`,
            class: "success"
          };

          changeNotification(newNotification);

          setPersons(persons.map(p => (p.id === foundPerson.id) ? res : p));
        })
        .catch(err => {
          console.log(err);

          const newNotification = {
            message: `Error when trying to update ${updatePerson} contact info`,
            class: 'error'
          }

          changeNotification(newNotification);
        });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personsService
        .createPerson(newPerson)
        .then(newPerson => {
          const newNotification = {
            message: `Added ${newPerson.name}`,
            class: 'success'
          };

          changeNotification(newNotification);

          setPersons(persons.concat(newPerson));
        })
        .catch(err => {
          console.log(err);

          const newNotification = {
            message: `Error occurred while adding ${newPerson.name}`,
            class: "error"
          }

          changeNotification(newNotification);
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

      <Notification
        notification={notification}
      />

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
        handleDelete={handleDelete}
        filter={filter}
      />
    </div>
  )
}

export default App