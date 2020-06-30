const mongoose = require('mongoose');
const Book = require('../model/Celebrity');
const Celebrity = require('../model/Celebrity');
// const Movie = require('../model/Movie');

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



// celebrities.forEach(celebrity => {
//   Movie.create(celebrity.movie).then(dbMovie => {
//     celebrity.movie = dbMovie._id;
//     Celebrity.create(celebrity)
//   })
// })
Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log('Success! Added ' + celebrities.length + ' to the database');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });