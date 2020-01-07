const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'movie-project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
    {
        name: "Tom Cruise",
        occupation: "actor",
        catchPhrase: "Talk to me, Goose!"
        
    },
    {
        name: "Beyonce",
        occupation: "singer",
        catchPhrase: "Sorry!"
        
    },
    {
        name: "Daffy Duck",
        occupation: "comic-figure",
        catchPhrase: "Quack, quack"
        
    }
]

Celebrity.create(celebrities, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${celebrities.length} celebrities`)
    mongoose.connection.close();
});