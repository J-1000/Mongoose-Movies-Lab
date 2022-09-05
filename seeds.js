const Celebrity = require('./models/Celebrity')

const mongoose = require('mongoose')
 mongoose.connect('mongodb://localhost:27017')
// mongoose.connect('mongodb+srv://RFv3aO5lhHY1Gf0b:DZ1nZVMkPMLmjIeM@cluster0.lyg7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityJWT_SECRET=fjdakl843902jfkdls')

const celebrity = [
	{
		name: "Gustavo cordera",
		occupation:"Cantante",
		catchPhrase: "Devolve la bolsa",
	},
	{
		name: "Pablito Lescano",
		occupation: "Artista",
		catchPhrase: "Corre guachin ",
	},
	{
		name: "Viviana Canosa ",
		occupation: "Pseudo-periodista",
		catchPhrase: "Bebe ingeniero",
	},
	{
		name: "Mona Gimenez ",
		occupation: "Cantante",
		catchPhrase: "Quieeeen, se ha tomado todo el vino. oh oh oh,",
	}
]

Celebrity.insertMany(celebrity)
	.then(celebrity => {
		console.log(`Success - added ${celebrity.length} to the db`)
		mongoose.connection.close()
	})
	.catch(err => {
		console.log(err)
	})