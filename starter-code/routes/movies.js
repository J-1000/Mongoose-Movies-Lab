const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

router.get('/movies', (req, res) => {
    console.log(Movie);
    Movie.find()
    .populate('cast')
    .then(movies => res.render('movies/index',{movies}));
});
        

router.get('/movies/new', (req, res) => {
    Celebrity.find()
    .then(celebrities => res.render('movies/new', {celebrities}));
  });


router.get('/movies/:_id', (req, res) => {
    const movieId = req.params._id;
    Movie.findById(movieId)
    .populate('cast')
    .then(movie => {
    console.log(movie);
    res.render('movies/show', { movie });
    }).catch(err => {
    console.log(err);
    });
    });   




router.post('/movies', (req, res) => {
            console.log(req.body);
            const { title, genre, plot, cast} = req.body;
            Movie.create({
                title, 
                genre, 
                plot, 
                cast
            })
            .then(movie => {
            Movie.find().then((movies) => res.render("movies/index", { movies }));
            }).catch(err => {
              console.log(err);
              //res.redirect('movies/new');
            });
          });



module.exports = router; 

