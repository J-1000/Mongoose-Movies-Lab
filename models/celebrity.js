const { Schema, model } = require('mongoose');

const celebSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  occupation: String,
  catchPhrase: String,
});

const Celebrity = model('Celebrity', celebSchema);

module.exports = Celebrity;
