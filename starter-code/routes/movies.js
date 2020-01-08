const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

router.get('/:movieId/edit', (req, res, next) => {
    
    Movie.findById(req.params.movieId).then(movies => {
        Celebrity.find().then(celebrities => {
            res.render('movies/edit.hbs', { movies, celebrities });
            })
            .catch(err => {
              next(err);
            });        
        })
        .catch(err => {
          next(err);
        });
});

router.post('/:movieId/edit', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
        Movie.update({ _id: req.params.movieId}, { $set: { title, genre, plot, cast } })
            .then((movie) => {
            res.redirect('/movies');
            })
            .catch((error) => {
            console.log(error);
            })    
    
});

    router.get('/new', (req, res, next) => {
        Celebrity.find().then(celebrities => {
            res.render('movies/new.hbs', { celebrities });
            })
            .catch(err => {
              next(err);
            });
    });
  
    router.post('/new', (req, res, next) => {
        
        const newMovie = new Movie(req.body);
        newMovie.save()
        .then((movie) => {
            res.redirect('/movies');
        })
        .catch((error) => {
            console.log(error);
        })
    });

    
    router.get('/', (req, res, next) => {
        Movie.find().populate('cast')
        .then(allTheMoviesFromDB => {
           console.log("movie", JSON.stringify(allTheMoviesFromDB))
            res.render('movies/index.hbs', { movies: allTheMoviesFromDB });
        })
        .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
        next(error);
        })
    });


module.exports = router;