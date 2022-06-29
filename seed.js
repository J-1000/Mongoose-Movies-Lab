const mongoose = require('mongoose')

const Celebrity = require('./models/celebrity')
const Movie = require('./models/movie')

require("dotenv/config");

//This is the path where the data will be seeded to, see env variables
const mongouri = process.env.MONGODB_URI

mongoose.connect(mongouri)

const celebrities = [
    {
        name: 'Cameron Kit',
        occupation: 'B-Movi Star',
        catchPhrase: "Put the bunny back in the box...",
    },
    {
        name: "Ann Fatale",
        occupation: 'C-Movi Star',
        catchPhrase: "I'm also just a girl standing in front of a boy asking him to love her.",
    },
    {
        name: 'Kate Katzenfutter',
        occupation: 'B-Movi Extra',
        catchPhrase: "I feel just like Julia Roberts in Pretty Woman. You know, except for the whole hooker thing.",
    },
]

//Celebrity.insertMany(celebrities)
//    .then(celebritiesFromDB => {
//        console.log(`Success - ${celebritiesFromDB.length} celebrities got created`)
//    })
//    .catch(err => console.log(err))



const movies = [
    {
        title: 'Film',
        gengre: 'Drama',
        plot: 'lalalala',
        cast: ['62bad7939ac2c0230812fa1f']
    },
    {
        title: 'Alien',
        gengre: 'Drama',
        plot: 'dumdum',
        cast: ['62bad7939ac2c0230812fa1f']
    },

]

Movie.insertMany(movies)
    .then(movieFromDB => {
        console.log(`Success - ${movieFromDB.length} movies got created`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))