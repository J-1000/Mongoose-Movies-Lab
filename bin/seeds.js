const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/boilerplate')



const celebrities = [
	{
		name: "Michael Jackson",
        occupation: "PopKing",
        catchPhrase: "I love children, i'am not in love with them",
	},

    {
		name: "Hodor",
        occupation: "Hodor Hodor",
        catchPhrase: "Hodor Hodor Hodor",
	},
	{
        name: "Britney Spears",
        occupation: "Popstar",
        catchPhrase: "It's Britney, bitch!",
	}
]


Celebrity.create(celebrities)
  .then(celebrities => {
    console.log(`Created ${celebrities.length} celebrities created`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));