const notificationReducer = (state = '', action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.notification;
  } else {
    return state;
  }
};

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  };
};

export default notificationReducer;