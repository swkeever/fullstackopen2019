/* eslint-disable no-undef */
const LOCAL_STORAGE_KEY = 'logged-blog-app-user';

const setLocalStorage = (user) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
};

const getLocalStorage = () => {
  const storedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(storedData);
};

const removeLocalStorage = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export default {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  LOCAL_STORAGE_KEY,
};
