const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');


router.get('/', (req, res, next) => {
    Movie.find()
    .populate('cast')
     .then(allMoviesFromDB => {
     res.render('movies/show-movies' , {movies: allMoviesFromDB});
    })
    .catch(error => {
      console.log("Fehler beim holen der Movie Daten aus der DB :", error);
    });
  });


  router.get('/add', (req, res, next) => {
    Celebrity.find()
    .then(allCelebrities => {
    res.render('movies/new-movie' , {celebrities: allCelebrities});
    })
    .catch(error => {
        console.log("Fehler beim holen der celebrity Daten aus der DB :", error);
    });
  });

// router.post new Movie
router.post('/add', (req, res, next) => {
    
    const newMovie = new Movie(req.body);
    newMovie.save()
      .then((movie) => {
        res.redirect('/movies');
      })
      .catch((error) => {
        res.redirect('/movies/add');
      });
  });

  router.post('/:id/delete', (req,res,next) => {
    
      Movie.findByIdAndRemove(req.params.id)
      .then(movie => {
          res.redirect('/movies');
      })
      .catch((error) => {
        next(error);
      });
    });

    router.get('/:id/edit', (req, res, next) => {  
        Movie.findById(req.params.id)
          .then(theMovie => {
            Celebrity.find().then(allCelebrities => {
                res.render('movies/edit-movie', { detail: theMovie , celebrities: allCelebrities});
            });
          })
          .catch(error => {
            next(error);
          });
      });
module.exports = router;