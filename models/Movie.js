// Iteration #7: The Movie Model

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    // Celebrity is the model name defined in celebrity.js.
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' }]
})

// Export the Movie model.
const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie;