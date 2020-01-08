const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movies');

const dbName = 'celebrities-project';
mongoose.connect(`mongodb://localhost/${dbName}`);  

const celebrities = [
{name: 'Sarnold Arztenegger', occupation: 'actor', catchPhrase: 'I\'ll won\'t be back.'},
{name: 'String', occupation: 'singer', catchPhrase: 'Life is stonger than justice.'},
{name: 'Carfield', occupation: 'cat', catchPhrase: 'I hate Tuesdays.'},
]

Celebrity.create(celebrities, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebrities`);
  mongoose.connection.close();
});
