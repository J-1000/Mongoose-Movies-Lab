const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
 
//mongoose.connect(`mongodb://localhost/${dbName}`);
mongoose.connect(`mongodb://localhost/celebrity`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
// To insert in "bin/seeds.js"
const celebrities = [
    {
        name: 'Madonna',
        occupation: 'Singer',
        catchPhrase: "I'm tough, I'm ambitious, and I know exactly what I want. If that makes me a bitch, okay.",
    },
    {
        name: 'Will Smith',
        occupation: 'Actor',
        catchPhrase: "Did I do that ?",
    },
    {
        name: 'Superman',
        occupation: 'SuperHero',
        catchPhrase: "Truth, justice and the American way.",
    }
]
Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log('Success! Added ' + celebrities.length + ' to the database');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });