const notificationReducer = (state = '', action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.notification;
  } else {
    return state;
  }
};

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: '',
      });
    }, seconds * 1000);
  }
};

export default notificationReducer;