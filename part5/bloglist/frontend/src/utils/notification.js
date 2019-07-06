const notificationTime = 5000;
const SUCCESS = 'success';
const ERROR = 'error';

const changeNotification = (notification, setNotification) => {
  const notificationNotSet = {
    message: '',
    class: '',
  };

  const className = `notification ${notification.class}`;

  const newNotification = {
    ...notification,
    class: className,
  }

  setNotification(newNotification);
  setTimeout(() => {
    setNotification(notificationNotSet);
  }, notificationTime);
};

const createNotification = (message, notificationClass) => ({
  message,
  class: notificationClass,
});

export default {
  changeNotification,
  createNotification,
  SUCCESS,
  ERROR,
};
