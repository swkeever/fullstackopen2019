import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createNew = async (content) => {
  const anecdote = {
    content,
    votes: 0,
  }

  const response = await axios.post(baseUrl, anecdote);

  return response.data;
}

const voteFor = async (id) => {
  const requestUrl = `${baseUrl}/${id}`;

  let response = await axios.get(requestUrl);
  const { data } = response;

  const updatedAnecdote = {
    ...data,
    votes: data.votes + 1,
  };

  response = await axios.put(requestUrl, updatedAnecdote);

  return response.data;
}

export default {
  getAll,
  createNew,
  voteFor,
}