import { FeedbackState, FeedbackAction, FeedbackActionType } from './types';

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state: FeedbackState = initialState, action: FeedbackAction): FeedbackState => {
  console.log(action)
  switch (action.type) {
    case FeedbackActionType.GOOD:
      return {
        ...state, 
        good: state.good + 1,
      };
    case FeedbackActionType.OK:
      return {
        ...state, 
        ok: state.ok + 1,
      };
    case FeedbackActionType.BAD:
      return {
        ...state,
        bad: state.bad + 1,
      }
    case FeedbackActionType.ZERO:
      return {
        ...initialState,
      }
  }
  return state
}

export default counterReducer