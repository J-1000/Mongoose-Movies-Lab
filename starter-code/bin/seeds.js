const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose
  .connect("mongodb://localhost/celebrities", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const celebrities = [
  {
    name: "Edward Snowden",
    occupation: "Hunted",
    catchPhrase: "Gotcha, you dirty sniffing agency!",
  },
  {
    name: "Julian Assange",
    occupation: "Hunted",
    catchPhrase: "Gotcha, you dirty sniffing agency vol 2!",
  },
  {
    name: "Chelsea Manning",
    occupation: "Just released",
    catchPhrase: "Gotcha, you dirty sniffing agency vol 3!",
  },
];

Celebrity.insertMany(celebrities)
  .then(() => {
    console.log("donezoni");
    mongoose.disconnect();
  })
  .catch((err) => console.log("stuff happened when writing to db", err));
