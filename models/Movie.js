const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  genre: String,
  plot: String,
  //   Not sure about this ⬇❗
  cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }],
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
