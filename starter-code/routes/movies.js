const express = require('express');
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');
const router = express.Router();

router.get('/', (req, res) => {
    Movie.find().populate('cast').then(movie => {
        console.log(movie);
        res.render('movies/movieInfo', { movie: movie });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/new', (req, res) => {
    Celebrity.find().then(celeb => {
      res.render('movies/new', { celebrity: celeb });
    }).catch(err => {
      console.log(err);
    })
});

router.post('/', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    const newMovie = new Movie({ title, genre, plot, cast });
    newMovie.save()
    .then((movie) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/celebrities/new');
    })
}); 

router.get('/:id/edit', (req, res) => {
    // res.send('edit movie');
    Celebrity.find().then(celeb => {
        Movie.findById(req.params.id).then(movie => {
            //console.log('should be one movie:', movie, 'should be all celebs: ', celeb);
            res.render('movies/edit', { movie: movie, celeb: celeb });
        })
    }).catch(err => {
        console.log(err);
        next(err);
    });
});

router.post('/:id', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, {
        title, 
        genre,
        plot,
        cast
      })
        .then(movie => {
          res.redirect(`/movies`);
        })
        .catch(err => {
          console.log(err);
          next(err);
        });
});

module.exports = router;