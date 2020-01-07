const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'Mongoose-Movies';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
    {
        name: "Tom Cruise",
        occupation: "actor",
        catchPhrase: "Mission Impossible"
    },
    {
        name: "Tom Hanks",
        occupation: "actor",
        catchPhrase: "Lauf Forest, lauf"
    },
    {
        name: "Michael Jackson",
        occupation: "singer",
        catchPhrase: "Thriller"
    }
];

Celebrity.create(celebrities, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${celebrities.length} celebrities`)
    mongoose.connection.close();
});