const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/starter-code", {
  useNewUrlParser: true,
});

const celebrity = [
  {
    name: "Johny Depp",

    occupation: "Actor",

    catchPhrase: "Did you miss Jack Sparrow?!",
  },
  {
    name: "Zlatan Ibrahimovich",
    occupation: "football player",
    catchPhrase: "Zlatan is the best ever!",
  },
  {
    name: "Donald Trump",
    occupation: "President",
    catchPhrase: "Build the wall!",
  },
];

Celebrity.create(celebrity)
  .then((data) => {
    console.log("Success");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
