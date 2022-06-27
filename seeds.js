const mongoose = require("mongoose");

const Celebrity = require("./models/Celebrity");

mongoose.connect("mongodb://localhost:27017/test");

const celebrities = [
  {
    name: "Max Black",
    occupation: "Actor",
    catchPhrase:
      "There are two things in life you cannot lose, a rent-controlled apartment and bladder control.",
  },
  {
    name: "Patrick Star",
    occupation: "A good Friend",
    catchPhrase: "Is mayonnaise an instrument?",
  },
  {
    name: "Peter Griffin",
    occupation: "Character",
    catchPhrase: "Lets go drink until we cant feel feelings anymore.",
  },
];

Celebrity.insertMany(celebrities)
  .then((celebritiesFromDB) => {
    console.log(`${celebritiesFromDB.length}`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
