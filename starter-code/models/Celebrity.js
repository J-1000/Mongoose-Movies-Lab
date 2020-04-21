const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebrityschema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celebrity = mongoose.model("Celebrity", celebrityschema);

module.exports = Celebrity;
