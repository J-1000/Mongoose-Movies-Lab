const mongoose = require('mongoose')
const Celebrities = require('../models/Celebrity.model')

// open up the connection to mongo
mongoose.connect('mongodb://localhost/movies-lab')

const celebrities = [
    {
        name: 'Tom Cruise',
        occupation: 'Actor',
        catchPhrase: 'Show me the money',
    },
    {
        name: 'Jay Z',
        occupation: 'Rapper',
        catchPhrase: 'If you can\'t buy it twice you can afford it',
    },
    {
        name: 'DJ Khaled',
        occupation: 'DJ',
        catchPhrase: 'Another One!',
    }
]

Celebrities.insertMany(celebrities)
    .then(celebrities => {
        console.log('Amout of records added ', celebrities.length)
        mongoose.connection.close();
    })
    .catch(err => console.log(err));