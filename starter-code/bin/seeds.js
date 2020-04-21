const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

const celebrityData = [
  {
    name: "Trevor Noah",
    occupation: "Comedian",
    catchPhrase:
      "You have to work a bit harder to offend me because I'm from the home of some of the best racism in the world. I'm a snob when it comes to racism.",
  },
  {
    name: "Wizkid",
    occupation: "Singer",
    catchPhrase: "It's your boy, Wizzy",
  },
  {
    name: "Dwayne Johnson",
    occupation: "Actor",
    catchPhrase: "Do you smell what The Rock is cooking",
  },
];

mongoose
  .connect("mongodb://localhost/celebrityDb", { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    Celebrity.insertMany(celebrityData).then((data) => {
      console.log("Data added successfully", data);
      x.connections[0].close();
    });
  })
  .catch((err) => console.log("Error", err));
