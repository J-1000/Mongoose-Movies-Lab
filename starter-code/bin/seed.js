const mongoose = require("mongoose");

const Celebrity = require("../models/celebrity")

const dbConnection = require("../configs/db.config")

const celebrities = [ 
  {
  name: "Carlos", 
  occupation: "Singer", 
  catchPhrase: "Got for it!", 
},
  {
  name: "Luis", 
  occupation: "Actor", 
  catchPhrase: "Always in!", 
},
  {
  name: "Majd", 
  occupation: "Influencer", 
  catchPhrase: "Life is good!", 
},
]

Celebrity.create(celebrities, (err)=> {
  if(err){
    throw (err)
  }
  console.log('Created 3 Celebrities')
  mongoose.connection.close()
})



