const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
 
const dbName = 'movies-lab';
mongoose.connect(`mongodb://localhost/${dbName}`);
 
const celebrities = [
  {
    name: "Robert DeNiro",
    occupation: "Taxi Driver",
    catchphrase: "You Talkin' To Me?"
  },
  {
    name: "Jack Nicholson",
    occupation: "Psycho",
    catchphrase: "Here’s Johnny!"
  },
  {
    name: "Heath Ledger",
    occupation: "Batman Hater",
    catchphrase: "Why So Serious?"
  }
 
]
 
Celebrity.create(celebrities, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebrities.`)
  mongoose.connection.close();
});