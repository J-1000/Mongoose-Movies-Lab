require("dotenv/config");
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/boilerplate";
mongoose.connect(MONGODB_URI)
	.then(db => console.log(`connected to database`))
	.catch(err => console.log(err))

const Celebrity = require('./models/Celebrity')


const celebrities = [
    {
        name: "Jhon",
        occupation: "actor",
        catchPhrase: "Hi",
    },
    {
        name: "Max",
        occupation: "actor",
        catchPhrase: "I",

    },
]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success - added ${celebrities.length} celebrities to the db`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))