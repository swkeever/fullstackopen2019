import React from 'react';
import CountryList from './CountryList';
import SingleCountryInfo from './SingleCountryInfo';

const Display = ({ countries, selection, setSelection }) => {
  if (!countries.length) {
    return (
      <p>No countries match your search.</p>
    );
  }

  if (countries.length > 10) {
    return (
      <p>Type a country name.</p>
    );
  }

  if (selection < 0 && countries.length > 1) {
    return (
      <CountryList
        countries={countries}
        setSelection={setSelection}
      />
    )
  };

  return (
    <SingleCountryInfo
      country={countries[selection]}
      countries={countries}
      setSelection={setSelection}
    />
  );
};

export default Display;