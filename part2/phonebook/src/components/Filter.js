import React from 'react';

const Filter = ({ filter, setFilter, handleChange }) => (
  <div>
    filter shown with
    <input
      value={filter}
      onChange={(e) => handleChange(setFilter, e.target.value.toLowerCase())}
    />
  </div>
);

export default Filter;