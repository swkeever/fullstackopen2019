import React from 'react';
import NewAnecdote from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = ({store}) => {
  return (
      <div>
        <Notification store={store} />
        <Filter store={store} />
        <AnecdoteList store={store}/>
        <NewAnecdote store={store}/>
      </div>
  );
};

export default App;