
const { Schema, model } = require("mongoose");
const movieSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  plot: String,
  cast: [ {type: Schema.Types.ObjectId, ref: "Celebrity"} ]
});
module.exports = model("Movie", movieSchema);