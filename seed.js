const mongoose = require('mongoose')

const MONGO_URI= process.env.MONGODB_URI || `mongodb://localhost:27017/movies-and-celebrities`



mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to add the Seed Data!"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const Celebrity = require('./models/Celebrity')

const initialCelebrities = [{
    name: 'Bruce Banner',
    occupation: 'actor',
    catchPhrase: "Don't make me angry."
},{
    name: 'Sheldon Cooper',
    occupation: 'actor',
    catchPhrase: "Bazinga."
},{
    name: 'Dr. Gregory House',
    occupation: 'actor',
    catchPhrase: "Everybody Lies"
}]

// insert the array of books into the db
Celebrity.insertMany(initialCelebrities)
	.then(initialCelebrities => {
		console.log(`Success - added ${initialCelebrities.length} initialCelebrities to the db`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))