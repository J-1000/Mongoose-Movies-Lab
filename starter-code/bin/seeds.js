const mongoose = require('mongoose');
const Celebrity = require ('../models/celebrity');

const dbName = 'celebrity-project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrity = [
    {
        name: "Arnold Schwarzenegger",
        occupation: "Hollywood actor and politician",
        catchPhrase: "hasta la vista baby!"
      },
      {
        name: "darkwing duck",
        occupation: "cartoon animated figure",
        catchPhrase: "zwo eins Risiko"
      },
      {
        name: "Smeagol",
        occupation: "fictive character named Gollum from the Lord of the Rings",
        catchPhrase: "mein Schatz!"
      }
];

Celebrity.create(celebrity, (err) => {
    if (err) { throw(err)}
    console.log(`created ${celebrity.length} celebrities`)
    mongoose.connection.close();
});