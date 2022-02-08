const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/mongoose-movies-lab')
  .then((db) => {
    console.log('Successfuly connected to the:', db.connections[0].name);
  })
  .catch((err) => {
    console.error(err);
  });

const Celebrity = require('./models/celebrity');

const initialCelebs = [
  {
    name: 'Bruce Wayne',
    occupation: 'Batman',
    catchPhrase: "I'm Batman!",
  },
  {
    name: 'Tony Stark',
    occupation: 'Avenger, Ironman',
    catchPhrase: 'I am Ironman.',
  },
  {
    name: 'Peter Parker',
    occupation: 'Avenger, Spiderman',
    catchPhrase: "I'm sorry, aunt May.",
  },
];

Celebrity.insertMany(initialCelebs)
  .then((celebs) => {
    console.log(`Succes, added ${initialCelebs.length} celebrities to the DB`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
