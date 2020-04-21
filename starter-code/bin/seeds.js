const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/celebrity", {
  useNewUrlParser: true,
});

const celebritys = [
  {
    name: "Donald Trump",
    occupation: "Really unknown",
    catchPhrase: "Let Make America Great Again",
  },
  {
    name: "Bladimir Puttin",
    occupation: "Petrol and Gas manager",
    catchPhrase: "Lets make America Bad Again",
  },
  {
    name: "Bugs Bunny",
    occupation: "Entretaiment Cartoon",
    catchPhrase: "Let Amerika fun again",
  },
];

Celebrity.insertMany(celebritys)
  .then((data) => {
    console.log("Success");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
