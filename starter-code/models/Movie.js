const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  // 'ObjectId' 'ref' to 'Celebrity' model
  cast: [
    {type: Schema.Types.ObjectId,
    ref: 'Celebrity'
    }
  ]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;