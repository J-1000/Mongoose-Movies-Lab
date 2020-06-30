const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.js");

mongoose.connect("mongodb://localhost/Mongoose-Movies-Lab", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [
  {
    name: "David Schwimmer",
    occupation: "An actor",
    catchPhrase: "WE WERE ON A BREAK!",
  },
  {
    name: "Matthew Perry",
    occupation: "An actor",
    catchPhrase: "Could we be more white trash?",
  },
  {
    name: "Matt LeBlanc",
    occupation: "An actor",
    catchPhrase: "How you doin",
  },
];

Celebrity.insertMany(celebrities)
  .then((celebrities) => {
    console.log(
      "Success! Added " + celebrities.length + " celebrities to the database"
    );
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
