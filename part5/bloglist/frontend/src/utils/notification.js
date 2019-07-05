const notificationTime = 5000;
const SUCCESS = 'success';
const ERROR = 'error';

const setNotification = (notification, setNotification) => {
  const notificationNotSet = {
    message: '',
    class: '',
  };

  setNotification(notification);
  setTimeout(() => {
    setNotification(notificationNotSet);
  }, notificationTime);
}

const createNotification = (message, notificationClass) => {
  return {
    message,
    class: notificationClass,
  }
}

export default {
  setNotification,
  createNotification,
  SUCCESS,
  ERROR,
}