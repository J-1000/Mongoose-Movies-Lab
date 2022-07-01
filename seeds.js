const mongoose = require('mongoose')

const Celebrity = require('./models/Celebrity')

mongoose.connect('mongodb://localhost:27017/test');



const celebrities = [
	{
		name: "Keanu Reeves",
		occupation: "Actor",
		catchPhrase: "The simple act of paying attention can take you a long way."
	},
	{
		name: "Elliot Smith",
		occupation: "Singer",
		catchPhrase: "Playing things too safe is the most popular way to fail. "
	},
	{
		name: "Haruki Murakami",
		occupation: "Author",
		catchPhrase: "Pain is inevitable. Suffering is optional."
	}
]

Celebrity.create(celebrities)
	.then(celebritiesFromDB => {
		console.log(`${celebritiesFromDB.length} celebrities got created`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))
