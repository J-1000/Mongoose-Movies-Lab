const router = require("express").Router();
const Celebrity = require("../models/Celebrity");
const Movie = require('../models/Movie');


router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        res.render('movies/new', {celebrityList: celebritiesFromDB})
        console.log({celebrityList: celebritiesFromDB})
    })
    .catch(err=>{
        next(err)
    })      
})


router.post('/movies', (req, res, next) => {
	const { title, genre, plot, cast } = req.body
    //console.log(req.body)
	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
        cast: cast
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
    .populate('cast') 
    .then(movieFromDB => {
        console.log(movieFromDB)
        res.render('movies/movieDetails', {movie: movieFromDB})
    })
    .catch(err => {
        next(err)
    })
})


router.get('/movies/:id/edit',(req, res, next) => {
	const movieId = req.params.id;
	//console.log(req.params)
	Movie.findById(movieId)
	.then(movieFromDB => {
		//console.log(celebrityFromDB)
		Celebrity.find()
		.then(celebritiesFromDB => {
			res.render('movies/edit', {movie: movieFromDB, celebrity: celebritiesFromDB})
		})
		//	
	})
	.catch(err => {
		next(err);
	})
})

router.post('/movies/:id/edit', (req, res, next) => {
	const movieId = req.params.id;
    console.log('try: ', req.body)
	const { title, genre, plot, cast } = req.body;
	Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast } )
	.then(()=> {
		res.redirect('/movies');
	})
	.catch(err => {
		next(err);
	})
})

module.exports = router;

