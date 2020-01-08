const mongoose = require('mongoose');
const MoviesSchema = mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Celebrity" }]
});

const Movie = new mongoose.model('Movie', MoviesSchema);
module.exports = Movie;
