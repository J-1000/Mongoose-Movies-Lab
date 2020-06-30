const mongoose = require('mongoose');
const Book = require('../model/Celebrity');
const Celebrity = require('../model/Celebrity');

mongoose.connect('mongodb://localhost/celebrity-library', {
  useNewUrlParser: true
});


let celebrities = [
    {
        name: "Jan",
        occupation: " Developer DJ", 
        catchPhrase: "trusth the process"
    },
    {
        name: " Roberto",
        occupation: " Master of Confusion", 
        catchPhrase: " cool cool cool"
    },
    {
        name: " NN ",
        occupation: " Student", 
        catchPhrase: " learning"
    }
];


Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log('Success! Added ' + celebrities.length + ' to the database');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });