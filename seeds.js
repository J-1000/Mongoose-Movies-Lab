const mongoose = require('mongoose');

const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/Mongoose-Movies-Lab');

const celebrities = [
	{
		name: "Matt Damon",
		occupation:"actor",
        catchPhrase: "Jason Bourne"
	},
    {
		name: "Brad Pitt",
		occupation:"actor",
        catchPhrase: "Achilles"
	},
    {
		name: "Russell Crowe",
		occupation:"actor",
        catchPhrase: "Maximus Decimus Meridius"
	}
]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success - ${celebrities.length} celebrities seeded to the database`);
		mongoose.connection.close();
	})
	.catch(err => {
		console.log(err);
	})