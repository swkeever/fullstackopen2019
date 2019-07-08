import React from 'react';
import { voteFor } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
  

  const { anecdotes, filter } = store.getState();

  const applyFilterOn = (anecdotes) => {
    return anecdotes.filter(anecdote => {
      const filterLowerCase = filter.toLowerCase();
      const contentLowerCase = anecdote.content.toLowerCase();

      return contentLowerCase.includes(filterLowerCase);
    })
  }

  const filteredAnecdotes = applyFilterOn(anecdotes);

  const byVotes = (a, b) => b.votes - a.votes;

  const sortedFilteredAnecdotes = filteredAnecdotes.sort(byVotes);

  const handleVote = (id) => {
    const getContent = () => {
      const anecdote = anecdotes.find(anecdote => anecdote.id === id);
      return anecdote.content;
    };

    const notification = `you voted '${getContent()}'`;

    store.dispatch(voteFor(id));
    store.dispatch(notificationChange(notification));
    setTimeout(() => store.dispatch(notificationChange('')), 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {sortedFilteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>,
      )}
    </>
  );
};

export default AnecdoteList;