import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Notes from './components/Notes';
import NewNote from './components/NewNote';
import VisibilityFilter from './components/VisibilityFilter';
import { initializeNotes } from './reducers/noteReducer';

const App = (props) => {
  useEffect(() => {
    props.initializeNotes();
  })
  const store = props.store;

  const filterSelected = (value) => () => {
    console.log(value);
  };

  return (
    <div>
      <NewNote store={store} />
      <VisibilityFilter store={store} />
      <Notes store={store} />
    </div>
  );
};

export default connect(null, { initializeNotes })(App);