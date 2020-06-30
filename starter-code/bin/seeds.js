const mongoose=require('mongoose'); 
const Celebrity=require('../models/Celebrity'); 

mongoose.connect('mongodb://localhost/starter-code', {
  useNewUrlParser:true
}); 

const celebrities=[
  {
    name: "Tom Cruise", 
    occupation: "Actor", 
    catchPhrase: "Show me the money"
  }, 
  {
    name: "Beyonce", 
    occupation: "Singer", 
    catchPhrase: "I woke up like this"
  },
  {
    name: "Daffy Duck", 
    occupation: "Comedian", 
    catchPhrase: "quack, quack"
  }  
];


Celebrity.create(celebrities, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebs`)
  mongoose.connection.close();
});


// Celebrity.insertMany(celebrities)
//   .then(celebrities => {
//     console.log(`Success! Added ${celebrities.length} to the database`); 
//     mongoose.connection.close(); 
//   })
//   .catch(err => {
//     console.log(err);
//   }); 



