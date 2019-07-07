export interface NoteAction {
  type: NoteActionType,
  data: NoteState,
};

export enum NoteActionType {
  NEW_NOTE,
  TOGGLE_IMPORTANCE,
};

export interface NoteState {
  id: number,
  content: string,
  important: boolean,
};

export interface NewNoteState extends NoteState {

};

export interface ToggleImportanceState extends NoteState {};