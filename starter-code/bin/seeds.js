const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/hollywood', {
  useNewUrlParser: true
});

const celebrities = [
  {name: 'Angelina Jolie',
   occupation: 'Actress',
   catchPhrase: 'Yea baby'
  },
  {name: 'Orlando Bloom',
   occupation: 'An Archer(Legolas)',
   catchPhrase: 'What are we waiting for?'
  },
  {name: 'John Rhys-Davies',
   occupation: 'A Fighting Dwarf',
   catchPhrase: 'Still only counts as one' 
  }
]

Celebrity.create(celebrities)
  .then(celebrities => {
    console.log(`Celebrities: ${celebrities.length} added to the DataBase`);
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err);
  })