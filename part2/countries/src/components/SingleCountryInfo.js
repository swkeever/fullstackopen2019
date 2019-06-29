import React from 'react';
import LanguageList from './LanguageList';
import CountryFlag from './CountryFlag';
import WeatherReport from './WeatherReport'
import GoBackButton from './GoBackButton';

const SingleCountryInfo = ({ country, countries, setSelection }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <LanguageList languages={country.languages} />
      <CountryFlag country={country} />
      <WeatherReport city={country.capital} />
      <GoBackButton 
        countries={countries}
        setSelection={setSelection} 
      />
    </div>
  );
};

export default SingleCountryInfo;