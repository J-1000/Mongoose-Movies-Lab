// models/Cat.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celSchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
});

const Celebrity = mongoose.model('Celebrity', celSchema);

module.exports = Celebrity;
