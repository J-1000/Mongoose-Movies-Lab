const mongoose = require("mongoose");
const Celebmodel = require("../models/celebrity");

mongoose.connect("mongodb://localhost/starter-code", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const celebs = [
    {
        name: "Tom Jo",
        occupation: "artist",
        catchPhrase: "its not joe with an e"
      },
      {
        name: "Tanya Cat",
        occupation: "cat shrink",
        catchPhrase: "meow"
      },
      {
        name: "Jan the Teacher",
        occupation: "Tutor",
        catchPhrase: "lets do a kata!"
      }
]

// Add here the script that will be run to actually seed the database (feel free to refer to the previous lesson)

// ... your code here
Celebmodel.create(celebs)
  .then((celebs) => {
    //   console.log("this is the celebs var",)
    console.log("Success! Added " + celebs.length + " celebrities to the database");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
  