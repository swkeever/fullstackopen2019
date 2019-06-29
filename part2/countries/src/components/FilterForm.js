import React from 'react';

const FilterForm = ({ filter, setFilter, handleChange }) => {
  return (
    <div>
      <label htmlFor="country-filter">find countries </label>
      <input 
        type="text" 
        id="country-filter" 
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterForm;