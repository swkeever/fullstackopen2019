import localStorageService from '../utils/local_storage';
import tokenService from '../utils/token';
import loginService from '../services/login';

export const UserActionTypes = {
  SET: 'SET_USER',
  CLEAR: 'REMOVE_USER',
  INITIALIZE: 'INIT_USER',
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case UserActionTypes.SET:
      return action.user;
    case UserActionTypes.CLEAR:
      return null;
    case UserActionTypes.INITIALIZE:
      return action.user;
    default:
      return state;
  }
};

export const initializeUser = () => async (dispatch) => {
  const user = localStorageService.getLocalStorage();

  if (user) {
    tokenService.setToken(user.token);
  }

  dispatch(
    {
      type: UserActionTypes.INITIALIZE,
      user,
    },
  );
};

export const setUser = credentials => async (dispatch) => {
  const user = await loginService.login(credentials);
  console.log(user)
  localStorageService.setLocalStorage(user);
  tokenService.setToken(user.token);

  dispatch({
    type: UserActionTypes.SET,
    user,
  });
};

export const clearUser = () => async (dispatch) => {
  tokenService.setToken(null);
  localStorageService.removeLocalStorage();

  dispatch({
    type: UserActionTypes.CLEAR,
  });
};

export default userReducer;
