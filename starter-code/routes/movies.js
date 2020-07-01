const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies');
const Celebrity = require('../models/Celebrity');


router.get('/movies/new', (req, res, next) => {
    Celebrity.find().then(celebrityFromDB => {
        res.render('moviesform', { celebrity: celebrityFromDB })
    }).catch(err => {
        console.log(err);
    })
});

router.post('/movies', (req, res) => {
    
    const { title, genre, plot, cast } = req.body;
    console.log(cast, req.body);
    Movie.create({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }).then(movie => {
        console.log(`Success! ${title} was added to the database.`);
        res.redirect(`/movies`);
    }).catch(err => {
        console.log(err);
    })
})

router.get('/movies', (req, res, next) => {
    Movie.find().populate("cast")
      .then((movieFromDB) => {
        res.render('movies', { movieList: movieFromDB })
      })
      .catch(err => {
        console.log(err);
      })
  });

router.get('/movies/edit/:movieId', (req, res) => {
    Movie.findById(req.params.movieId).populate("cast")
      .then(movie => {
        Celebrity.find().then(celebrities => {
          let options = '';
          let selected = '';
          celebrities.forEach(actor => {
            if(movie.cast.map(el => el._id).includes(actor._id)) {
              selected = 'selected';
            } else {
              selected = '';
            }
            options += `<option value="${actor._id}" ${selected}>${actor.name}</option>`;
          })
          // res.render('movieEdit', { movie: movie, celebrities: celebrities })
          res.render('movieEdit', { movie: movie, options})
        })
      }).catch(err => {
        console.log(err);
      });
  });

  router.post('/movies/:movieId', (req, res) => {
    const { title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(req.params.movieId, {
      title,
      genre,
      plot,
      cast
    })
      .then(movie => {
        console.log('Movie has been updated', movie);
        res.redirect(`/movies`);
      })
      .catch(err => {
        console.log(err);
      });
  })

module.exports = router;