const dotenv = require('dotenv')
const colors = require('colors')
const mongoose = require('mongoose')

const Celebrity = require('./models/Celebrity')

dotenv.config()

// open up the connection to mongo
mongoose.connect(process.env.MONGO_URI)

const celebrities = [
	{
    name: 'Anthony Hopkins',
    occupation: 'Actor',
    catchPhrase: 'My philosophy is: It’s none of my business what people say of me and think of me.'
  },
  {
    name: 'Kirk Hammett',
    occupation: 'Guitarist',
    catchPhrase: 'My guitars are my umbilical cord. They are directly wired into my head.'
  },
  {
    name: 'Meryl Streep',
    occupation: 'Actress',
    catchPhrase: 'Integrate what you believe in every single area of your life. Take your heart to work and ask the most and best of everybody else, too.'
  },
]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success! - ${celebrities.length} were added to the database`.cyan.underline)
		mongoose.connection.close()
	})
	.catch(err => console.log(err).red.underline.bold)


