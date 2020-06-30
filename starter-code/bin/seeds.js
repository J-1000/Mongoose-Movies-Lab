const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");
mongoose.connect("mongodb://localhost/library", {
    useNewUrlParser: true
});


const celebrities = [

    {
        name: 'Anne Hathaway',
        occupation: 'Princess',
        catchPhrase: 'a'
    },

    {
        name: 'Jeff',
        occupation: 'King',
        catchPhrase: 'Idk'
    },

    {
        name: 'Jan',
        occupation: 'queen',
        catchPhrase: 'this was a joke'
    }
]

Celebrity.insertMany(celebrities)
  .then(celebrities => {
      console.log("Success! Added" + celebrities.length + "to the database");
      mongoose.connection.close();
  })
  .catch(err=> {
      console.log(err);
  });