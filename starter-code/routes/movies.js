const express = require('express');
const router  = express.Router();
const Movie = require('../model/Movie')

router.get('/movies', (req, res) => {
    console.log('luposki')
    res.render('movies/index-movie');
  });


router.post('/movies', (req, res) => {
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
      res.redirect(`/movies/${movie._id}`);
    }).catch(err => {
      console.log(err);
    })
  })

  module.exports=router