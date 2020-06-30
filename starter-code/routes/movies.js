const express = require('express');
const router  = express.Router();
const Movie = require('../model/Movie');
const Celebrity = require('../model/Celebrity');

router.get('/movies', (req, res) => {
    console.log('luposki')
    res.render('movies/index-movie');
  });

// router.get('/movies/new-movie', (req, res) => {

//     res.render('movies/new-movie', {})
// }
//     )

router.get('/movies/show-movie', (req, res) => {
    console.log('alfonsina')
    res.render('movies/show-movie');
  });

router.get('/movies/new-movie', (req, res) => {
    Celebrity.find().then(celebritiesFromDB => {
        res.render('movies/new-movie', { celebrities: celebritiesFromDB });
        }).catch(err => {
          console.log(err);
        })
      })

router.post('/movies/new-movie', (req, res) => {
    console.log(req.body);
    // const title = req.body.title;
    // const author = req.body.author;
    // const description = req.body.description;
    // const rating = req.body.rating;
    const { title, genre, plot, cast} = req.body;
    Movie.create({
        title,
        genre,
        plot,
        cast,
    }).then(movie => {
      console.log(`Success! ${title} was added to the database.`);
      res.redirect(`/movies/show-movie`, {movie: movie});
    }).catch(err => {
      console.log(err);
    })
  })

  module.exports=router