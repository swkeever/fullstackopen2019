import React, { useContext } from 'react'
import FilteredBooks from './FilteredBooks';
import { UserContext } from '../App'

const Recommend = (props) => {
  const user = useContext(UserContext);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
      <FilteredBooks filter={user.favoriteGenre} />
    </div>
  )
  
}

export default Recommend;
