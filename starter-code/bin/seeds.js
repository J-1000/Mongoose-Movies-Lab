const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/celebrities", {
  useNewUrlParser: true,
});

const celebrities = [
  {
    name: "Juliette Binoche",
    occupation: "actress",
    catchPhrase: "Attraction is beyond our will or ideas sometimes.",
  },
  {
    name: "Johnny Depp",
    occupation: "actor",
    catchPhrase:
      "I think the thing to do is enjoy the ride while you're on it.",
  },
  {
    name: "Search Results",
    occupation: "actress",
    catchPhrase:
      "When a guy tells me I'm cute, it's not something desirable. Cute is more like what you want your pet to be.",
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
