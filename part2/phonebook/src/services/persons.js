import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const createPerson = async person => {
  const req = axios.post(baseUrl, person);
  const res = await req;
  return res.data;
}

const updatePerson = async (updatedPerson) => {
  const personUrl = `${baseUrl}/${updatedPerson.id}`;
  const req = axios.put(personUrl, updatedPerson);
  const res = await req;
  return res.data;
}

const getAllPersons = async () => {
  const req = axios.get(baseUrl);
  const res = await req;
  return res.data;
}

const deletePerson = async person => {
  const personUrl = `${baseUrl}/${person.id}`;
  const req = axios.delete(personUrl, person);
  const res = await req;
  return res.data;
}

export default { createPerson, updatePerson, getAllPersons, deletePerson };
