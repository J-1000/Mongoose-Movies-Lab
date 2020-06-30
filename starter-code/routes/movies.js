const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js');
const Celebrity = require('../models/celebrity.js');


router.get('/movies', (req, res, next) => {
    Movie.find().populate('cast').then(allMovies => {
            res.render('movies', {
                movies: allMovies
            });
        })
        .catch(error => {
            console.log('Error: ', error);
        })
});

router.get('/movies/new', (req, res, next) => {
    Celebrity.find().then(allCelebrities => {
        res.render('movies/new', {
            celebrities: allCelebrities
        })
    })
});

router.post('/movies', (req, res, next) => {
    const {
        title,
        genre,
        plot,
        cast
    } = req.body;
    const newMovie = new Movie({
        title,
        genre,
        plot,
        cast
    });
    newMovie.save()
        .catch((error) => {
            res.render('movies/new');
            console.log(error);
        })
        .then((oneMovie) => {
            res.redirect('/movies');
        })
});

module.exports = router;