import { NoteState, NoteAction, NoteActionType } from './types'

const noteReducer = (state: NoteState[] = [], action: NoteAction): NoteState[] => {
  switch (action.type) {
    case NoteActionType.NEW_NOTE:
      return [...state, action.data];
    case NoteActionType.TOGGLE_IMPORTANCE:
      const id = action.data.id;
      const noteToChange = state.find(note => note.id === id);

      if (!noteToChange) {
        throw new Error('id did not exist in state array');
      }

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      return state.map(note => note.id !== id ? note : changedNote);
  }

  return state;
}

export default noteReducer;