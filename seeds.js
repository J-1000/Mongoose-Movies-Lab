require("dotenv/config");
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
	.then(db => console.log(`connected to database`))
	.catch(err => console.log(err))


    const Celebrity = require('./models/celebrity')


    const celebrity = [ 
   
{       
     name:'Simarpreet Singh',
        occupation:'comedian',
        catchPhrase: 'A Diamond is Forever.'

},

{       
        name:'happy Singh',
       occupation:'Singer',
       catchPhrase: 'I know nothing.'

},

{       
    name:'pargat Singh',
   occupation:'Actor',
   catchPhrase: 'I know everthing.'

}   
    ]


    // insert the array of celebrities into the db

Celebrity.insertMany(celebrity)
	.then(celebritys => {
		console.log(`Success - added ${celebritys.length} books to the db`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))