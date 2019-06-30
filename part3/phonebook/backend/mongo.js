const mongoose = require('mongoose');

const usage = () => {
  console.log('(add new entry)    usage: node mongo.js <password> <name> <number>');
  console.log('(show all entries) usage: node mongo.js <password>');
  process.exit(1);
}

const showAllPersons = () => {
  console.log('phonebook:');
  Person
    .find({})
    .then(result => {
      result.forEach(person => console.log(`${person.name} ${person.number}`));
      mongoose.connection.close();
    });
}

const addNewPerson = () => {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({ name, number });

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

const numArgs = process.argv.length;

if (numArgs !== 5 && numArgs !== 3) {
  usage();
}

const password = process.argv[2];
const url = `mongodb+srv://swkeever:${password}@cluster0-wyhhb.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (numArgs === 3) {
  showAllPersons();
} else {
  addNewPerson();
}



