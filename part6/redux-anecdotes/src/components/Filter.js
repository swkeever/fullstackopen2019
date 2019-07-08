import React from 'react'
import { setFilter } from '../reducers/filterReducer';

const Filter = ({ store }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(setFilter(value));
    store.dispatch(setFilter(value));
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter