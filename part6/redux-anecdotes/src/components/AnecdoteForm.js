import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';

const NewAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.new_anecdote.value;
    event.target.new_anecdote.value = '';
    props.createAnecdote(content);
  };

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
  );
};

export default connect(
  null,
  { createAnecdote },
)(NewAnecdote);