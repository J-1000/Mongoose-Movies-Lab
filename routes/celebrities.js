const router = require("express").Router();
// we need to require the Celebrity model to cammunicate with the db
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
	// console.log('celebrities')
	// get all the books from the db
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			// render a view named 'books' with all the books from the db 
			res.render('celebrities/index', { celebrityList: celebritiesFromDB })
		})
		.catch(err => {
			next(err)
		})
})

//we had to locate this before /celebrities/:id function
//anything after /celebrities/:id => after celebrities/ will
//be interepreted by the below function
//this is the frontend(form)
router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new');
})

// after submitting the form
// because we are adding a new celebrity to our celebrity list in
// http://127.0.0.1:3000/celebrities webpage
router.post('/celebrities', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body
	//we are creating variables through destructuring 
	//from req.bodt so that we can use them below:
	Celebrity.create({
		name: name,
		occupation: occupation,
		catchPhrase: catchPhrase
	})
	.then(newCelebrity => {
		console.log(newCelebrity)
		res.redirect('celebrities')
	})
	.catch(
		res.render('/celebrities/new')
	)
})

router.get('/celebrities/:id', (req, res, next) => {
	console.log(req.params.id);
	const celebrityID = req.params.id;
	Celebrity.findById(celebrityID)
	.then(celebrityFromDB => {
		res.render('celebrities/celebrityDetails', {celebrity: celebrityFromDB})
		//here we dont use /celebrities/celebrityDetails with / 
		//because it is a folder name
	})
	.catch(err => {
		next(err)
	})
})





module.exports = router;
