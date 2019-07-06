/* eslint-disable no-undef */
const localStorage = 'logged-blog-app-user';

const setLocalStorage = (user) => {
  window.localStorage.setItem(localStorage, JSON.stringify(user));
};

const getLocalStorage = () => {
  const storedData = window.localStorage.getItem(localStorage);
  return JSON.parse(storedData);
};

const removeLocalStorage = () => {
  window.localStorage.removeItem(localStorage);
};

export default {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
};
