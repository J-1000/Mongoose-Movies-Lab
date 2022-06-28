const mongoose = require('mongoose')

const Celebrity = require('./models/Celebrity')

require("dotenv/config");
const mongouri = 'mongodb+srv://new-user:L8UdoHR7cWloApya@cluster0.0yglzcg.mongodb.net/mongoose-movies-lab'


mongoose.connect(mongouri)

const celebrities = [
	{
		name: "Iron Hack",
		occupation: "Web Developer",
        catchPhrase: "Life is hard."
	},
    {
		name: "Mario Haha",
		occupation: "Boss",
        catchPhrase: "I'm boss."
	},
    {
		name: "Dog Lee ",
		occupation: "Junky",
        catchPhrase: "The world is wonderful!"
	}
]

Celebrity.insertMany(celebrities)
	.then(celebritiesFromDB => {
		console.log(`Success - ${celebritiesFromDB.length}  celebrities got created`)
        // console.log(celebritiesList)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))
