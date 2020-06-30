const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/starter-code', {
    useNewUrlParser: true
});

const initialCelebrities = [
    {
        name: 'Brad Pitt',
        occupation: 'actor',
        catchPhrase: "Whats in the box??!"
    },
    {
        name: 'Leonardo di Caprio',
        occupation: 'actor',
        catchPhrase: "save the world"
    },
    {
        name: 'Arnold Schwarzenegger',
        occupation: 'actor',
        catchPhrase: "I'm back!"
    }
]

Celebrity.insertMany(initialCelebrities)
    .then(celebrities => {
        console.log(`${celebrities.length} were inserted to the DB`);
        mongoose.connection.close();
    })
    .catch(err => console.log(err));