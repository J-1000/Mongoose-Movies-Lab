const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');


//Iteration #8: Adding a new movie
router.get("/new", (req, res) => {
    Celebrity.find()
      .then((celebritiesFromDB) => {
        res.render("movies/newmovie", { celebrities: celebritiesFromDB });
      })
      .catch((err) => {
        next(err);
      });
  });



router.post('/', (req, res, next) => {


    const {title, genre, plot, cast} = req.body;
    Movie.create({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }).then(movie => {
        console.log(`Succesfully added ${movie} to database`)
        res.redirect(`/movies/${movie._id}`);
    }).catch(err => {
        console.log(err);
        next(err);
      });

})


router.get('/', (req, res, next) => {

    Movie.find().then(movies => {
        console.log(movies)
        res.render('movies/allmovies', {movies});
    }).catch(err => {
        console.log(err);
        next(err);
      });
})

router.get('/:id', (req, res, next) => {

    Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
        res.render('movies/show', {showMovie: movie});
    }).catch(err => {
        console.log(err);
        next(err);
      });
})

router.post('/:id/delete', (req, res) => {

  Movie.findByIdAndRemove({_id:req.params.id
     
  }).then(movie => {
      console.log(`Succesfully removed ${movie} from database`)
      res.redirect(`/movies`);
  }).catch(err => {
      console.log(err);
      next(err);
    });

})






module.exports = router;