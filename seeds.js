const mongoose = require('mongoose')

const Celebrity = require('./models/Celebrity')

require("dotenv/config");
const mongouri = process.env.MONGODB_URI

mongoose.connect(mongouri)

const celebrities = [
    {
        name: 'Athena',
        occupation: 'ska group',
        catchPhrase:' Her sey guzel olacak'
    },
    {
        name: 'Bob Marley',
        occupation: 'reggea singer',
        catchPhrase: 'Sun is shining, the weather is sweet'
    },
    {
        name: 'Pink Floyd',
        occupation: 'progressive rock band',
        catchPhrase: 'shine on you crazy dimond'
    }
]

Celebrity.insertMany(celebrities)
	.then(celebritiesFromDB => {
		console.log(`Success - ${celebritiesFromDB.length} celebrities got created`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))