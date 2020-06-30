const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/celebrity")
const Movie = require("../models/movie")




router.get('/movies', (req, res, next) => {
  Movie
  .find()
  .populate('cast')
  .then(movies => {
    console.log(movies)
    res.render("movies",{movies})})
  
})
router.get('/movies/new', (req, res, next) => {
  Celebrity.find().then(celebrities => {
    console.log(celebrities)
    res.render("addMovie",celebrities)})
  
})

router.post('/movies', (req, res, next) => {
  
  const {title, genre, plot, cast} = req.body
  Movie
  .create({title, genre, plot, cast})
  .then(movie => {
    console.log(movie)
    res.redirect(`/movies`)})

  // 
  
  
})



module.exports = router;
