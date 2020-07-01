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

router.get('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId).populate('cast')
        .then(oneMovie => {
            Celebrity.find().then(allCelebrities => {
                // console.log(allCelebrities);
                res.render('movies/edit', {
                    movies: oneMovie,
                    celebrities: allCelebrities
                });
            })
        })
        .catch(error => {
            console.log('Error: ', error);
            next();
        })
});

router.post('/movies/:id/edit', (req, res, next) => {
    const {
        title,
        genre,
        plot,
        cast
    } = req.body;
    Movie.update({
            _id: req.params.id
        }, {
            $set: {
                title,
                genre,
                plot,
                cast
            }
        }, {
            new: true
        })
        .then((oneMovie) => {
            res.redirect('/movies');
        })
        .catch((error) => {
            res.render('movies/new');
            console.log(error);
        })
});

router.post('/movies/:id/delete', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findByIdAndRemove(movieId)
        .catch(error => {
            console.log('Error: ', error);
            next();
        })
        .then((oneMovie) => {
            res.redirect('/movies');
        })
});

module.exports = router;