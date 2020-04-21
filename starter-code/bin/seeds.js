const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/starter-code', {
  useNewUrlParser: true
});


const celebrities = [
    {
        name: "Robert De Niro",
        occupation: "Dramatic Actor",
        catchPhrase: "Are you talkin' to me?"
    },
    {
        name: "Bugs Bunny",
        occupation: "Cartoon Character",
        catchPhrase: "What's up Doc?"
    },
    {
        name: "Charles Bukoski",
        occupation: "Author",
        catchPhrase: "Don't Try"
    }
];



Celebrity.insertMany(celebrities).then(data => {
   console.log('Success');
   mongoose.connection.close()
 }).catch(err => {
   console.log(err);
 });