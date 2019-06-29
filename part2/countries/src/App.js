import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import Display from './components/Display';

import axios from 'axios';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selection, setSelection] = useState(-1);

  useEffect(() => {
    const allCountries = 'https://restcountries.eu/rest/v2/all';
    axios
      .get(allCountries)
      .then(res => {
        setCountries(res.data);
      });
  }, []);

  const filteredCountries = countries.filter(country => {
    const countryName = country.name.toLowerCase();
    return countryName.includes(filter);
  });

  const handleChange = (e) => {
    setFilter(e.target.value.toLowerCase());
    setSelection(-1);
  }

  if (selection < 0 && filteredCountries.length === 1) {
    setSelection(0);
  }

  return (
    <div>
      <FilterForm 
        filter={filter}
        setFilter={setFilter} 
        handleChange={handleChange}
      />
      <Display 
        countries={filteredCountries} 
        selection={selection} 
        setSelection={setSelection}
      />
    </div>
  );
};

export default App;