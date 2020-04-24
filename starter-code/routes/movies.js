const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

/* GET movies page */
router.get('/', (req, res) => {
    Movie.find()
    .populate('cast')
    .then(movies => {
        res.render('movies/index', {movies: movies});
    })
    .catch(err => {
        console.log(err);
        next(err);
 });
});


/* get to show a form */
router.get('/new', (req, res) => {
    //connect to the celebrities data
  Celebrity.find()
    .then(celebrities => {
    //render celebrities data in the view 'movies/new'
    res.render('movies/new', {celebrities: celebrities})
    })
  .catch(err => {
    console.log(err);
    next(err);
 });
})


// post form to add to database
router.post('/', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }).then(movie => {
      console.log(`Success ${movie} was added to the database`);
      //redirect to movies route
      res.redirect(`/movies`);
    }).catch(err => {
      console.log(err);
      // logs the error to the console
      next(err);
    });
  });



  module.exports = router;