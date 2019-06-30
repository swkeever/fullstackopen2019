import React from 'react';

const PersonForm = ({ addNewContact, newName, newNumber, setNewName, setNewNumber, handleChange }) => (
  <form onSubmit={addNewContact}>
    <div>
      name:
      <input
        value={newName}
        onChange={(e) => handleChange(setNewName, e.target.value)}
      />
    </div>
    <div>
      number:
      <input
        value={newNumber}
        onChange={(e) => handleChange(setNewNumber, e.target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;