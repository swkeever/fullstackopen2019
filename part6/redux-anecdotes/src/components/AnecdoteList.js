import React from 'react';
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  const anecdotes = props.visibleAnecdotes;

  const handleVote = (id) => {
    const getContent = () => {
      const anecdote = anecdotes.find(anecdote => anecdote.id === id);
      return anecdote.content;
    };

    const notification = `you voted '${getContent()}'`;

    props.voteFor(id);
    props.setNotification(notification, 10);
  };

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
        </div>,
      )}
    </>
  );
};

const getVisibleAnecdotes = ({ anecdotes, filter }) => {
  const applyFilterOn = (anecdotes) => {
    return anecdotes.filter(anecdote => {
      const filterLowerCase = filter.toLowerCase();
      const contentLowerCase = anecdote.content.toLowerCase();

      return contentLowerCase.includes(filterLowerCase);
    })
  }

  const filteredAnecdotes = applyFilterOn(anecdotes);

  const byVotes = (a, b) => b.votes - a.votes;
  filteredAnecdotes.sort(byVotes);

  return filteredAnecdotes;
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: getVisibleAnecdotes(state),
  }
}

const mapDispatchToProps = {
  voteFor,
  setNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);