import React from 'react';

const CountryFlag = ({ country }) => {
  const alt = `Flag of ${country.name}`;
  return (
    <div>
      <img src={country.flag} alt={alt} width="15%" />
    </div>
  )
};

export default CountryFlag;