const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

morgan.token('data', (req, res) => JSON.stringify(req.body));

app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

const apiPersons = '/api/persons';

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
];

app.get(apiPersons, (req, res) => {
  res.json(persons);
});

app.get(`${apiPersons}/:id`, (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
})

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${persons.length} people\n\n${new Date()}`;
  res.send(info);
});

app.delete(`${apiPersons}/:id`, (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.send(204).end();
});

app.post(apiPersons, (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    });
  }

  if (persons.find(p => p.name)) {
    return res.status(400).json({
      error: 'name already exists in the phonebook'
    });
  }

  const generateId = () => Math.floor(Math.random() * 1000000);

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint'
  });
}

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})