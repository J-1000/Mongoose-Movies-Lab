const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");



const celebrities = [
  {
    name: "Cardi B",
    occupation: "singer",
    catchPhrase: "Its corona times.",
  },
  {
    name: "Mickey Rourke",
    occupation: "actor",
    catchPhrase: "It was either theraphy or die.",
  },
  {
    name: "John Oliver",
    occupation: "comedian",
    catchPhrase: "lorem ipsum",
  },
];

Celebrity.insertMany(celebrities)
  .then((data) => {
    console.log("Success");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

  mongoose.connect("mongodb://localhost/movieslab", {
  useNewUrlParser: true,
});