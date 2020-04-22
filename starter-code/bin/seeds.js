const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
// const Author = require('../models/Author');

mongoose.connect('mongodb://localhost/starter-code', {
  useNewUrlParser: true
});

const celebrities = [
  {
    name: "Suzanne",
    occupation: "actor",
    catchPhrase: "I got you!"
  },
  {
    name: "Amber",
    occupation: "singer",
    catchPhrase: "I am hungry!"
  },
  {
    name: "Edem",
    occupation: "comedian",
    catchPhrase: "I am bored!"
  }
]


Celebrity.create(celebrities)
    .then(data => {
        console.log('Success');
        mongoose.connection.close()
  }).catch(err => {
      console.log(err);
  });

// after above, seed the data into DB by running 'node bin/seed.js'

// books.forEach(book => {
//     // first we create the author
//     Author.create(book.author).then(dbAuthor => {
//       // take the id from the author that was just created in the database
//       book.author = dbAuthor._id;
//       Book.create(book);
//     });
//   });