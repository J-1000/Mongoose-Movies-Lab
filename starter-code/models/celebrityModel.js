const { Schema, model } = require("mongoose");
const celebritySchema = new Schema({
  name: String, // String is shorthand for {type: String}
  occupation: String,
  catchPhrase: String,
});
module.exports = model("Celebrity", celebritySchema);