import React from 'react';

const GoBackButton = ({ countries, setSelection }) => {
  if (countries.length === 1) {
    return null;
  }

  const handleClick = (e) => {
    setSelection(-1);
  }

  return (
    <button onClick={handleClick}>go back</button>
  )


};

export default GoBackButton;