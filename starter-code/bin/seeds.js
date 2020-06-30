const mongoose = require('mongoose');
const celebrity = require('../models/celebrity.js');
const dbname = 'mongoose-movie-lab';
mongoose.connect(`mongodb://localhost/${dbname}`, { 
useCreateIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true
}).then(console.log("OK")).catch(err => console.log(err)); 

const celebrities = [
    { name: 'Brad Pitt',
      occupation: 'actor',
     catchphrase: 'Whatever, man!'},
     { name: 'Henry Cavill',
      occupation: 'actor',
     catchphrase: 'I am Superman!'},
     { name: 'Eva Green',
      occupation: 'actress',
     catchphrase: 'Hi Guys!'},
]

celebrity.create(celebrities, (err) => {
    console.log(`Added ${celebrities.length} movies!`)
    mongoose.connection.close();
    }); 