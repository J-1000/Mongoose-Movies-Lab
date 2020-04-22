const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie')

/* GET movies page */
router.get('/movies/', (req, res) => {
    Movie.find()
    .populate('cast')
    .then(movies => {
        console.log('those are movies:', movies)
        res.render('movies/index', {moviesAll: movies});
    })
    .catch(err => {
        console.log(err);
        next(err);
 });
});


/* GET show a form */
router.get('/movies/new', (req, res) => {
    //connect to the celebrity data saved in MongoDB
  Celebrity.find()
    .then(celebrities => {
    console.log('those are celebrities:', celebrities)
    //pass celebrities data to the view 'movies/new'
    res.render('movies/new', {celebritiesAll: celebrities})
    })
  .catch(err => {
    console.log(err);
    next(err);
 });
})

  
// POST form add to database
router.post('/movies', (req, res) => {
    // use object destructuring
    const { title, genre, plot, cast } = req.body;
    // "name: name": 1st name key matches schema; 2nd name comes from const == req.body.name
    Movie.create({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }).then(movie => {
      console.log(`Success ${movie} was added to the database`);
      //redirect to a route, but not view
      res.redirect(`/movies`);
    }).catch(err => {
      console.log(err);
      // logs the error to the console
      next(err);
    });
  });



  module.exports = router;