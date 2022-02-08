const router = require('express').Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/celebrity');

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then((celebsFromDB) => {
      res.render('movies/new', {
        celebs: celebsFromDB,
      });
    })
    .catch((err) => next(err));
});

router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  console.log(cast);
  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      console.log(createdMovie);
      res.redirect(`/movies/${createdMovie._id}`);
    })
    .catch((err) => next(err));
});

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render('movies/index', {
        movies: moviesFromDB,
      });
    })
    .catch((err) => next(err));
});

router.get('/movies/delete/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch((err) => next(err));
});

router.get('/movies/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .populate('cast')
    .then((movieFromDB) => {
      res.render('movies/show', { movie: movieFromDB });
    })
    .catch((err) => next(err));
});

module.exports = router;
