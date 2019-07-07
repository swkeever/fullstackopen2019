import React from 'react';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ store }) => {
  const byVotes = (a, b) => b.votes - a.votes;

  const anecdotes = store.getState().sort(byVotes)

  const handleVote = (id) => {
    console.log('vote', id)
    console.log(vote(id));
    store.dispatch(vote(id));
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList;