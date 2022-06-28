const router = require("express").Router();
// we need to require the Celebrity model to cammunicate with the db
const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie')

router.get('/celebrities', (req, res, next) => {
	// console.log('celebrities')
	// get all the celebrities from the db
	Celebrity.find()
		.then(celebritiesFromDB => {
		//	console.log(celebritiesFromDB)
			//console.log(celebritiesFromDB[0].name)
			// render a view named 'celebrities' with all the celebrities from the db 
			res.render('celebrities/index', { celebrityList: celebritiesFromDB })
		})
		.catch(err => {
			next(err)
		})
})

//just show the form
router.get('/celebrities/new', (req, res) => res.render('celebrities/new.hbs'));

router.post('/celebrities', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body;
	//console.log(req.body);
	Celebrity.create({ name, occupation, catchPhrase })
		// .then(celebritiesFromDB => console.log(`New celebrity created: ${celebritiesFromDB.name}.`))
		.then(() => res.redirect('/celebrities'))
		.catch(error => res.render('celebrities/new'))
});

router.get('/celebrities/:id', (req, res, next) => {
	const celebrityId = req.params.id
	
	Celebrity.findById(celebrityId)
		.then(celebrityFromDB => {
		//	console.log(celebrityFromDB)
			res.render('celebrities/show', { celebrityDetail: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
})

router.post('/celebrities/:id/delete', (req, res, next) => {
	const celebrityId = req.params.id
	Celebrity.findByIdAndRemove(celebrityId)
		.then(() => res.redirect('/celebrities'))
		.catch(error => res.render('celebrities/new'))
});

router.get('/celebrities/:id/edit', (req, res, next) => {
	const celebrityId = req.params.id
	Celebrity.findById(celebrityId)
		.then(celebrityFromDB => {
		//	console.log(celebrityFromDB)
			res.render('celebrities/edit', { celebrityDetail: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
})

router.post('/celebrities/:id/', (req, res, next) => {
	const celebrityId = req.params.id
	const { name, occupation, catchPhrase } = req.body;
	//console.log(celebrityId)
	Celebrity.findByIdAndUpdate(celebrityId, req.body)
		.then(() => res.redirect('/celebrities'))
		.catch(err => {
			next(err)
		})
});


router.get('/movies', (req, res, next) => {
	Movie.find()
		.then(moviesFromDB => {
			res.render('movies/index', { movieList: moviesFromDB })
		})
		.catch(err => {
			next(err)
		})
})


//just show the form which could create a movie
router.get('/movies/new', (req, res) => res.render('movies/new.hbs'));

router.post('/movies', (req, res, next) => {
	const { title, genre, plot, cast } = req.body;
	console.log(req.body);

	Movie.create({ title:title, genre:genre, plot:plot, cast:cast })
		.then(() => res.redirect('/movies'))
		.catch(err => {
			next(err)
		})

});

module.exports = router;

