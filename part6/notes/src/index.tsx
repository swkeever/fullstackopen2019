import React from 'react';
import ReactDOM from 'react-dom';
import { NoteAction, NoteState, NoteActionType, } from './reducers/types';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);

store.dispatch({
  type: NoteActionType.NEW_NOTE,
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: NoteActionType.NEW_NOTE,
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(note => {
          return (
            <li key={note.id}>
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));

renderApp();


