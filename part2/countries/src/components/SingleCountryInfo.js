import React from 'react';
import LanguageList from './LanguageList';
import CountryFlag from './CountryFlag';
import WeatherReport from './WeatherReport'

const SingleCountryInfo = ({ country, showCountry = true }) => {
  if (!showCountry) {
    return null;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <LanguageList languages={country.languages} />
      <CountryFlag country={country} />
      <WeatherReport city={country.capital} />
    </div>
  );
};

export default SingleCountryInfo;