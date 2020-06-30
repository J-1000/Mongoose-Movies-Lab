const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity')
const Movie = require('../models/movie')

/* GET home page */
router.get('/movie/:id', (req, res, next) => {
  const id = req.params.id
  Movie.findById(id).populate('cast').then(movie => 
    res.render("detailsMovies", {movie})
   )
});

router.get('/movie/edit/:id', (req, res, next) => {
  const id = req.params.id
  Movie.findById(id).then(movie =>{ 
    Celebrity.find().then(celebrities => {
      res.render("editMovies",{movie,celebrities}
      )
    }
    )}
   )
  
});
router.post('/movie/edit/:id', (req, res, next) => {
  console.log('Hey')
  const id = req.params.id
  const {title , genre, plot, cast} = req.body
  Movie.findByIdAndUpdate({_id:id}, {title , genre, plot, cast})
  .then(result => {
    console.log(result)
    res.redirect(`/movie/${id}`)
  })
});

router.get('/movie/delete/:id', (req, res, next) => {
  const id = req.params.id
  Movie.deleteOne({_id:id}).then(result => {console.log(result)
    res.redirect("/movies")}
   )
});


module.exports = router;
