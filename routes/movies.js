const router = require("express").Router()

const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')

router.get('/movies/new', (req, res, next) => {

     Celebrity.find()
     .then(celebritiesFromDB => {
         res.render('movies/new', {celebritiesList: celebritiesFromDB})
     })
     .catch(err => {
         next(err)
     })
})

router.get('/movies/:id', (req, res, next) => {

	const movieId = req.params.id
	Movie.findById(movieId)
        .populate('cast')
		.then(movieFromDB => {
            console.log(movieFromDB)
			res.render('movies/show', { movie: movieFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/movies', (req, res, next) => {

	const { title, genre, plot, cast } = req.body

	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
        cast: cast
	})

		.then(createdMovie => {	
			res.redirect('/movies')
		})
		.catch(err => {
			res.render('movies/new')
		})
});

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(moviesFromDB => {
            res.render('movies/index', {moviesList: moviesFromDB})
        })
        .catch(err => {
            next(err)
        })
})

router.get('/movies/edit/:id', (req, res, next) => {

	const id = req.params.id

	Movie.findById(id)
		.then(movieFromDB => {
			res.render('movies/edit', {movie: movieFromDB})
		})
		.catch(err => {
			next(err)
		})
})

// router.post('/celebrities/edit/:id', (req, res, next) => {
// 	const celebrityId = req.params.id

// 	const {name, occupation, catchPhrase} = req.body
// 	Celebrity.findByIdAndUpdate(celebrityId, {name, occupation, catchPhrase})
// 		.then(() => {
// 			res.redirect('/celebrities')
// 		})
// 		.catch(err => {
// 			next(err)
// 		})
// })	

module.exports = router