const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity-model"); // celebrity-model.js
const Schema = mongoose.Schema;

// see also celebrity-model.js
const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: Celebrity }],
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
