const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity')
require("dotenv/config");
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
//const mongouri = process.env.MONGODB_URI

mongoose.connect('mongodb://localhost:27017')
//mongodb+srv://king:skizz@cluster0.wr0hu.mongodb.net/?retryWrites=true&w=majority
let arr = [ { name:'Alex', occupation:'smoll.Co',catchPhrase:'mmoll' },
    {name :'D',occupation:'ok',catchPhrase: 'im bored'},
    { name : 'Smith' ,occupation:'book',catchPhrase:'arraleguay' }
]

Celebrity.create(arr)
  .then(arr => {
    console.log(`The user is saved and its value is: ${arr}`)
    mongoose.connection.close()
})
  .catch(error => console.log('An error happened while saving a new user:', error));
