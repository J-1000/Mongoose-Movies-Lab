const express = require('express');
const Movie = require('../models/movie');
const Celebrity = require ('../models/celebrity')
const router = express.Router();

router.get('/movies', (req, res, next) => {
    console.log(Movie);
    Movie.find()
     
      .then(allTheMoviesFromDB => {
        console.log('Retrieved movies from DB:', allTheMoviesFromDB);
        res.render('movies.hbs', {movies : allTheMoviesFromDB});
      })
      .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
      })
  });


  
router.post('/movies', (req, res, next) => {
    const {  title, genre, plot, cast } = req.body;
    const newMovie = new Movie({   title, genre, plot, cast})
    newMovie.save()
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log(error);
    })
  });


router.get('/movies/:id/delete', (req, res, next) => {
    console.log("This is req.params.id:", req.params.id)
 
    Movie.findByIdAndRemove(req.params.id).then(
    res.redirect('/movies'))
    .catch((error) => {
        console.log(error);
      })
}); 

  
router.get('/movies/:id', (req, res, next) => {
    
    Movie.findById(req.params.id).then(movie => {
        res.render('movies/show.hbs', {movie: movie})
    }).catch(error => {
        console.log('Error', error);
      })
});
 

router.get('/movie/add', (req, res, next) => {

  Celebrity.find().then(allTheCelebritiesFromDB => {
    res.render('movies/new', { celebrities: allTheCelebritiesFromDB});
    console.log(allTheCelebritiesFromDB)
  }).catch(err => {
    console.log(err);
  })
})
 

module.exports = router;