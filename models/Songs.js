const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    tittle: String,
    genre: String,
    lyric: String,
    cast:[],
  });

const Song = mongoose.model("Song", songSchema);

module.exports = Song;