const router = require("express").Router();
const Celebrity = require("../models/Celebrity.js");
const Movie = require('../models/Movie.js')
router.get('/movies/new', (req, res, next) => {
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('movies/new', { cast: celebritiesFromDB })
		})
		.catch(err => next(err))
});
router.get('/movies', (req, res, next)=>{
    Movie.find()
    .populate('cast')
    .then(moviesFromDB=>{
        res.render('movies', {movies: moviesFromDB})
    })
});
router.post('/movies', (req, res, next)=>{
    const {title, genre, plot, cast}=req.body
    .then(createdMovie=>{
        res.redirect('movies')
    })
    .catch(err=> next(err))
})
