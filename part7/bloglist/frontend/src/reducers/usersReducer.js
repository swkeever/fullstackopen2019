import usersService from '../services/users';

export const UsersActionTypes = {
  INITIALIZE: 'INIT_USERS',
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case UsersActionTypes.INITIALIZE:
      return action.users;
    default:
      return state;
  }
}

export const initializeUsers = () => async (dispatch) => {
  const users = await usersService.getAll();
  dispatch({
    type: UsersActionTypes.INITIALIZE,
    users,
  });
} 

export default usersReducer;
