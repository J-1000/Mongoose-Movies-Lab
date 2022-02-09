// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
// Iteration #1: The Celebrity Model
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/celebrities-collection";

mongoose.connect('mongodb://localhost/celebrities-collection')
    // .then(db => console.log(db)) ~~~ Mongoose {connections: []}
    .then(db => console.log(`connected to database ${db.connections[0].name}`))
    .catch(err => console.log(err));