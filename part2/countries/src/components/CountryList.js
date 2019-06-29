import React from 'react';
import CountryButton from './CountryButton';

const CountryList = ({ countries }) => {
  return (
    <ul>
      {
        countries.map(country => {
          return (
              <li key={country.numericCode}>{country.name}
              <CountryButton country={country} />
              </li>
          )

        })
      }
    </ul>
  )
};

export default CountryList;