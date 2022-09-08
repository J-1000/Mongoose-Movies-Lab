require("dotenv/config");
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
	.then(db => console.log(`connected to database`))
	.catch(err => console.log(err))

const Celebrity = require('./models/celebrity')

const celebrity =[{
    name: "Garry Sandhu",
    occupation: "Singer",
    catchPhrase:"Ja Ni Ja"


},
{
    name: "Diljit Dosanjh",
    occupation: "Actor",
    catchPhrase:"Ambarsariya"
},
{
    name: "Parmish Verma",
    occupation: "Director",
    catchPhrase:"Rocky Mental"
}
];
Celebrity.insertMany(celebrity)
.then(Celebrity => {
		console.log(`Success - added ${Celebrity.length} Celebrity to the db`)
	mongoose.connection.close()
	})
.catch(err => console.log(err))