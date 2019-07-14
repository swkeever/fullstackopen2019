import deepFreeze from 'deep-freeze';
import userReducer, { UserActionTypes } from './userReducer';

describe('userReducer', () => {
  const mockUser = {
    username: 'swk',
    name: 'sean',
    token: '12345',
  };

  test('able to login', () => {
    const state = null;
    const action = {
      type: UserActionTypes.SET,
      user: { ...mockUser },
    };
    const newState = userReducer(state, action);

    expect(newState).toEqual(mockUser);
  });

  test('able to logout', () => {
    const state = { ...mockUser };
    const action = {
      type: UserActionTypes.CLEAR,
    };

    deepFreeze(state);
    const newState = userReducer(state, action);

    expect(newState).toBeNull();
  });
});
