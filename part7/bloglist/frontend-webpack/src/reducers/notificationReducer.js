export const NotificationActionTypes = {
  SET: 'SET_NOTIFICATION',
  CLEAR: 'CLEAR_NOTIFICATION',
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case NotificationActionTypes.CLEAR:
      return null;
    case NotificationActionTypes.SET:
      return action.notification;
    default:
      return state;
  }
};

const setNotification = notification => async (dispatch) => {
  dispatch(notification);
  setTimeout(() => {
    dispatch({
      type: NotificationActionTypes.CLEAR,
    });
  }, 10000);
};

export const setSuccessNotification = (message) => {
  const action = {
    type: NotificationActionTypes.SET,
    notification: {
      message,
      class: 'success',
    },
  };

  return setNotification(action);
};

export const setFailureNotification = (message) => {
  const action = {
    type: NotificationActionTypes.SET,
    notification: {
      message,
      class: 'error',
    },
  };

  return setNotification(action);
};

export default notificationReducer;
