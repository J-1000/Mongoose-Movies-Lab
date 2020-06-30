const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/movies', {
  useNewUrlParser: true
});

const celebrities = [
    {
        name: 'Hillary Clinton',
        occupation: 'politician',
        catchPhrase: "First female president"

    },
    {
        name: 'Sheldom Cooper',
        occupation: 'physisist',
        catchPhrase: "Bazinga!"
    },
    {
        name: 'Donald Trump',
        occupation: 'president',
        catchPhrase: "Make America great again"
    }
]
;

Celebrity.insertMany(celebrities)
.then(celebrity => {
  console.log('Success! Added ' + celebrity.length + ' to the database');
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
});