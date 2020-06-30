const express = require('express');
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');
// const { findById } = require('../models/Movie');
const router = express.Router();


router.get('/movies', (req, res) => {
    Movie
        .find().populate('cast')
        .then(movies => res.render('movies/index', {movies}))
})

router.get('/movies/new', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new', {celebrities}))
    
})

router.post('/movies', (req, res) => {
    const {title, genre, plot, cast} = req.body;
    Movie
    .create({ title, genre, plot, cast})
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

module.exports = router;