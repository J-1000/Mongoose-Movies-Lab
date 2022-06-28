const mongoose = require("mongoose");

const Celebrity = require("./models/Celebrity");

require("dotenv/config");
const mongouri = process.env.MONGODB_URI;

mongoose.connect(mongouri);

const celebrities = [
  {
    name: "Sema Gul",
    occupation: "Singer",
    catchPhrase: "I am a copy paster",
  },
  {
    name: "Antonio",
    occupation: "Singer",
    catchPhrase: "I used to sing",
  },
];

Celebrity.insertMany(celebrities)
  .then((celebritiesFromDB) => {
    console.log(
      `Success - ${celebritiesFromDB.length} celebrities got created`
    );
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
