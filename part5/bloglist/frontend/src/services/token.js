let token = null;

const setToken = (value) => token = `bearer ${value}`;

const getToken = () => token;

export default { setToken, getToken };