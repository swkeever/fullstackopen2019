require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(bodyParser.json());

morgan.token('data', req => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

const apiPersons = '/api/persons';

app.get(apiPersons, (req, res) => {
  Person
    .find({})
    .then((persons) => {
      res.json(persons.map(person => person.toJSON()));
    });
});

app.get(`${apiPersons}/:id`, (req, res, next) => {
  Person
    .findById(req.params.id)
    .then((person) => {
      if (person) {
        res.send(person.toJSON());
      } else {
        res.status(204).end();
      }
    })
    .catch(err => next(err));
});

// app.get('/info', (req, res) => {
//   const info = `Phonebook has info for ${persons.length} people\n\n${new Date()}`;
//   res.send(info);
// });

app.delete(`${apiPersons}/:id`, (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => next(err));
});

app.post(apiPersons, (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(() => person.toJSON())
    .then(formattedPerson => res.send(formattedPerson))
    .catch(err => next(err));

  return false;
});

app.put(`${apiPersons}/:id`, (req, res, next) => {
  const { body } = req;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.send(updatedPerson.toJSON());
    })
    .catch(err => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint',
  });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  }

  next(err);

  return false;
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
