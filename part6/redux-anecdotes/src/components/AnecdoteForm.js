import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdote = ({ store }) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.new_anecdote.value;
    event.target.new_anecdote.value = '';
    store.dispatch(createAnecdote(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input 
            name="new_anecdote"
          />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default NewAnecdote;