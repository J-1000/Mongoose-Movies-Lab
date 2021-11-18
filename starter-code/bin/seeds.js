const mongoose = require("mongoose");
const Celebrity = require("../models/celebrityModel");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/celeberity-project";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


const celebrities = [
  {
    name: "Brad Pit",
    occupation:"Actor" ,
   catchPhrase:"Suzanne Happiness is overrated. There has to be conflict in life.",
  },
  {
    name: "Leonardo DiCaprio",
    occupation:"Actor",
    catchPhrase: "I'm not the kind of person who tries to be cool or trendy, I'm definitely an individual",
  },
  {
    name: "To Kill a MockingbirdScarlett Johansson",
    occupation:"Actor",
    catchPhrase: "Harper LeIf you feel glamorous, you definitely look glamorous"
  }
];

 Celebrity.create(celebrities)
   .then((celebritiesDB) => {
     console.log(`Created ${celebritiesDB.length} celebrity`);
     // Once created, close the DB connection
     mongoose.connection.close();
   })
   .catch((err) => console.log(`An error occurred while creating books from the DB: ${err}`));