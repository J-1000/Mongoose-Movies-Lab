const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'mongoose-movies-lab';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebritiesArray = [
    {
        name: "Robert Lewandowski",
        occupation: "Football player",
        catchPhrase: "Charge!",
    },
    {
        name: "Dirty Harry",
        occupation: "Bad Guy",
        catchPhrase: "Yeehaw!",
    },
    {
        name: "Atul Bhardwaj",
        occupation: "CTO",
        catchPhrase: "From good to great",
    }
]

Celebrity.create(celebritiesArray, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${celebritiesArray.length} celebrities`)
    mongoose.connection.close();
});