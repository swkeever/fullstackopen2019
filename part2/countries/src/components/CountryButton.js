import React, { useState } from 'react';
import SingleCountryInfo from './SingleCountryInfo';

const CountryButton = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);
  const [buttonText, setButtonText] = useState('show');

  const handleClick = (countryName, e) => {
    setShowCountry(!showCountry);
    setButtonText(showCountry ? 'show' : 'hide');
  }

  return (
    <>
      <button onClick={(e) => handleClick(country.name, e)}>{buttonText}</button>
      <SingleCountryInfo country={country} showCountry={showCountry} />
    </>

  );
};

export default CountryButton;