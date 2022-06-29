const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    title: String,
    gengre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
        // this refers to the model the id belongs to
        ref: 'Celebrity'
    }]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;