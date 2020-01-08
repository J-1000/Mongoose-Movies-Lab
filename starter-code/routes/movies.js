const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie.js')
const Celebrity = require('../models/celebrity.js')


router.get('/new', (req, res, next) =>{
    Celebrity.find().then(celebrities => {
        res.render('movies/new', {celebrities});    
    })
    .catch(error => {next(error)})
});

router.post('/new', (req, res, next) =>{
    const newMovie = new Movie(req.body);
    console.log(`this is the new insert: ${newMovie}`)
    console.log(req.body);
    newMovie.save()
    .then((movie) => {res.redirect('/celebrities')
    })
    .catch(error => {next(error)})
});

router.get('/celebrities', (req, res, next) => {
    Celebrity.findById(req.params.id).populate('movie')
      .then(someStuff => {
        res.render('new', { celebrity: someStuff });
      })
      .catch(error => {
        console.log('Ive no idea why: ', error);
      })
  });


router.get('/', (req, res, next) =>{
    Movie.find().populate("cast")
    .then(allMovies => {
        res.render('movies/index', {movies: allMovies});
    })
    .catch(error => {next(error)}
    );
});

module.exports = router;
