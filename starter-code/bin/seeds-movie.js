const mongoose = require('mongoose');
const Movie = require('../models/celebrity');

const dbName = 'mongoose-movies-lab';
mongoose.connect(`mongodb://localhost/${dbName}`);

const moviesArray = [
    {
        title: "Batman",
        genre: "Action",
        plot: "Some stuff",
        cast: []
    }
]

Movie.create(moviesArray, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${moviesArray.length} movies`)
    mongoose.connection.close();
});

