import React from 'react';
import CountryList from './CountryList';
import SingleCountryInfo from './SingleCountryInfo';

const Display = ({ countries }) => {
  if (!countries.length) {
    return (
      <p>No countries match your search.</p>
    );
  }

  if (countries.length > 10) {
    return (
      <p>Make filter more specific.</p>
    );
  }

  return (countries.length > 1)
    ? <CountryList countries={countries} />
    : <SingleCountryInfo country={countries[0]} />
};

export default Display;