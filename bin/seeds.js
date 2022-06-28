const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity')

mongoose.connect('mongodb://localhost:27017/movie-app');

const celebrities = [
    {
        name : 'Elvis Crespo',
        occupation : 'Singer',
        catchPhrase : 'Suavemente'
    },
    {  
        name : 'Rick Sanchez',
        occupation : 'Scientist Interdimensional',
        catchPhrase : 'Im a scientist'
    },
    {
        name : 'Valentino Rossi',
        occupation : 'Retired MotoGP KING',
        catchPhrase : 'The Doctor'
    }
]

Celebrity.insertMany(celebrities)
.then(celebrities => {
    console.log(`Success - added ${celebrities.length} to the db`)
    mongoose.connection.close()
})
.catch(err => {
    console.log(err)
})
