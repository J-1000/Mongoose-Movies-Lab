const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/celebrities", {
  useNewUrlParser: true,
});

const celebrities = [
  {
    name: "Pete Sampras",
    occupation: "Tennis Player",
    catchphrase: "I let my racket do the talking",
  },
  {
    name: "Andre Agassi",
    occupation: "Tennis Player",
    catchphrase:
      "What makes something special is not just what you have to gain, but what you feel there is to lose",
  },
  {
    name: "Roger Federer",
    occupation: "Tennis Player",
    catchphrase:
      "When you do something best in life, you dont really want to give that up and for me its tennis.",
  },
];

celebrities.forEach((data) => {
  Celebrity.create(data).then(() => {
    console.log("Database created");
    mongoose.connection.close();
  });
});
