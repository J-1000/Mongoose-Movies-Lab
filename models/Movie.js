const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "Celebrity",
    },
  ],
});

const Movies = mongoose.model("Movies", movieSchema);
module.exports = Movies;
