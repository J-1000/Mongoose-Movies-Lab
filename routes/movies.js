const router = require("express").Router();
const Movie = require('../models/Movie');


router.get('/movies/new', (req, res, next) => {
    res.render('movies/new')
})


router.post('/movies', (req, res, next) => {
	const { title, genre, plot, cast } = req.body
    //console.log(req.body)
	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
        //cast: cast
	})
	.then(newMovie => {
       // console.log(newMovie)
		res.redirect(`/movies`)
	})
	.catch( err => {
		res.render('movies/new')
	})
})


router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(moviesFromDB => {
        console.log(moviesFromDB)
        res.render('movies/index', {movieList: moviesFromDB})
    })    
    .catch(err =>
        next(err))
})

router.get('/movies/:id', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId)
    //.populate('cast') --> this is not working
    .then(movieFromDB => {
        res.render('movies/movieDetails', {movie: movieFromDB})
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router;