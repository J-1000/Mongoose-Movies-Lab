const express = require('express');
const router  = express.Router();
const Movie = require('../models/movies.js');
const Celebrity = require('../models/celebrity.js');

/* GET all Movies */
  router.get('/', (req, res, next) => {
    Movie.find().populate('cast')
    .then(allMovsFromDB => {
      console.log({mov: allMovsFromDB});
      res.render('movies/index.hbs', {mov: allMovsFromDB});
    })
    .catch(error => {
      console.log(error);
    });
  });

  /* Add new Movie Step 2 */
  router.post('/', (req, res, next) => {
    const newMovie = new Movie(req.body);
    newMovie.save()
    .then(() => {
      res.redirect('/movies');
    })
    .catch(error => {
      console.log(error);
      res.render('movies/new.hbs');
    });
  });
  
  /* Add new Movie Step 1 */
  router.get('/new', (req, res, next) => {
    Celebrity.find()
    .then(allCelebsFromDB => {
      console.log({celeb: allCelebsFromDB});
      res.render('movies/new.hbs', {celeb: allCelebsFromDB});
    })
    .catch(error => {
      console.log(error);
    });
  });

/* Edit single Movie Step 1 */
router.get('/:id/edit', (req, res, next) => {
  Movie.findOne({ '_id': req.params.id }).populate('cast')
  .then(oneMovFromDB => {
    Celebrity.find()
    .then(allCelebsFromDB => {
      //console.log({all: {mov: oneMovFromDB, celeb: allCelebsFromDB} });
      res.render('movies/edit', {mov: oneMovFromDB, celeb: allCelebsFromDB} );
    })
    .catch(error => {
      console.log(error);
    });
  })
  .catch(error => {
    console.log(error);
  });
});

/* Edit single Movie Step 2 */
router.post('/:id', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.update({_id: req.params.id}, {$set: { title, genre, plot, cast }})
  .then(() => {
    res.redirect('/movies');
  })
  .catch(error => {
    console.log(error);
  });
})

module.exports = router;
