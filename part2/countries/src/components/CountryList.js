import React from 'react';

const CountryList = ({ countries, setSelection }) => {
  const handleClick = (selection) => {
    setSelection(selection);
  }

  return (
    <ul>
      {
        countries.map((country, i) => {
          return (
              <li key={country.numericCode}>{country.name}
                <button onClick={() => handleClick(i)}>show</button>
              </li>
          )

        })
      }
    </ul>
  )
};

export default CountryList;