import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import Display from './components/Display';

import axios from 'axios';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

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
  }

  return (
    <div>
      <FilterForm 
        filter={filter}
        setFilter={setFilter} 
        handleChange={handleChange}
      />
      <Display countries={filteredCountries} />
    </div>
  );
};

export default App;