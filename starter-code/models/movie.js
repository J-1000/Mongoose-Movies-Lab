const mongoose = require("mongoose");

const Schema = mongoose.Schema

const moviesSchema = new Schema({
  title : String,
  genre: String, 
  plot: String, 
  cast: [{
    type: Schema.Types.ObjectId,
    ref:'Celebrity',
  }],

}, {
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at",
  }
});

const Movie = mongoose.model("Movie", moviesSchema)
module.exports = Movie
