const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/celebrity');

// Iteration #8: Adding a new movie
router.get('/movies/new', (req, res, next) => {
    Celebrity.find({})
        .then(celebrities => {
            res.render('movies/new', { celebrities })
        })
        .catch(err => next(err))
})

// Iteration #9: Adding actors to the movie cast
router.post('/movies', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(createdMovie => {
            console.log(createdMovie)
            res.redirect('/movies')
        })
        .catch(err => res.render('movies/new'))
})

router.get('/movies', (req, res, next) => {
    Movie.find({})
        .populate('cast')
        .then(movies => {
            // console.log(movies[0].cast)
            res.render('movies/index', { movies, doctitle: 'Movies' });
        })
        .catch(err => next(err));
});

// Iteration #11 Editing a movie
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
router.get('/movies/:id/edit', (req, res, next) => {
    Promise.all([
            Movie.findById(req.params.id),
            Celebrity.find({})
        ])
        .then(values => {
            console.log(values)
            res.render('movies/edit', { movie: values[0], celebrities: values[1], doctitle: 'Edit the Movie' })
        })
        .catch(err => next(err));
})

// router.post('/movies/:id/edit', (req, res, next) => {
router.post('/movies/:id/edit', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
        .then(movie => {
            // res.redirect(`/movies/${movies._id}`)
            res.redirect(`/movies`)
        })
        .catch(err => next(err));

})

//populate() replaces the cast ID with the whole document of that ObjectID in db
router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then(movie => {
            console.log(movie)
            res.render('movies/show', { movie, doctitle: 'Movie Details' })
        })
        .catch(err => next(err));
})


module.exports = router;