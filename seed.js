const mongoose = require('mongoose')

const Celebrity = require('./models/Celebrity.model')

require("dotenv/config");
const mongouri = process.env.MONGODB_URI || 'mongouri'

mongoose.connect(mongouri)

const celebrities = [
    {
        name: 'Amy Dunne',
        occupation: 'writer',
        catchPhrase: 'What Have We Done To Each Other? What Will We Do?'
    },
    {
        name: 'Lana Del Ray',
        occupation: 'singer',
        catchPhrase: 'Cause you\'re just a man, it\'s just what you do'
    },
    {
        name: 'Patrick Bateman',
        occupation: 'investment banker',
        catchPhrase: 'I like to dissect girls. Did you know I\'m utterly insane?'
    }
]

Celebrity.insertMany(celebrities)
	.then(celebritiesFromDb => {
		console.log(`Success - ${celebritiesFromDb.length} books got created`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))