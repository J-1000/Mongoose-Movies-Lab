//Model
const mongoose=require('mongoose'); 
const Celebrity=require('../models/Celebrity'); 

mongoose.connect('mongodb://localhost/mongoose-movies-lab', {
  useNewUrlParser: true
}); 

//Data
const celebrities = [
  {
    name: "Robert Plant",
    occupation: "Ex-Led Zeppelin Singer",
    catchPhrase: "I'm a golden God!",
  },

  {
    name: "Ozzy Osbourne",
    occupation: "Being Ozzy",
    catchPhrase: "All right now!",
  },

  {
    name: "Lemmy Kilmister",
    occupation: "Rocking the World",
    catchPhrase: "We are Mötorhead and we play Rock & Roll!",
  }
]

//Seed
Celebrity.create(celebrities)
  .then(celebrities => {
    console.log(`Celebrities: ${celebrities.length} added to the DataBase`);
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err);
  }) 