const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require("../models/Celebrity.model");


router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(movies => {
            res.render('movies/index', {movies})
        })
        .catch(err => next(err))
});

router.get('/movies/add', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new', {celebrities})
        })
        .catch(err => next(err))
});

router.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id).populate('cast')
        .then(movie => {
            res.render('movies/show', {movie})
        })
        .catch(err => next(err))
});

router.post('/movies', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
        .then(movie => {
            res.redirect(`/movies/${movie._id}`)
        })
        .catch(err => next(err))
});

router.get('/movies/:id/edit', (req, res, next) => {

    Movie.findById(req.params.id).populate('cast')
        .then(movie => {
            Celebrity.find()
                .then(celebrities => {
                    const selectedCelebrities = [...celebrities]
                    for(const celebrity of selectedCelebrities) {
                        celebrity["status"] = movie.cast.some(obj => JSON.stringify(obj) === JSON.stringify(celebrity));
                    }
                    res.render('movies/edit', {movie: movie, selected: selectedCelebrities})
                });
        })
        .catch(err => next(err))
});

router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => next(err))
});

router.post('/movies/:id', (req, res, next) => {

    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast}, {new: true})
        .then(() => {
            res.redirect(`/movies/${req.params.id}`)
        })
        .catch(err => next(err))
});

module.exports = router;
