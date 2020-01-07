const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'mongoose-movies';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
  {
  name: "Paul Panzer",
  occupation: "Commedian",
  catchPhrase: "Bloedsinn",
  },
  {
    name: "Fluffy Poo",
    occupation: "be shit",
    catchPhrase: "Pups",
  },
  {
    name: "Wally Wahnsinn",
    catchPhrase: "Seid ihr denn Irre ?"
  }
];

Celebrity.create(celebrities, (err) => {
  if (err) {throw (err);}
  console.log(`Created ${celebrities.length} Celebrities`);
  mongoose.connection.close();
});