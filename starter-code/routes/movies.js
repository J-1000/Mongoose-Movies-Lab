const express=require('express'); 
const router=express.Router(); 
const Movie=require('../models/Movie'); 
const Celebrity=require('../models/Celebrity'); 

router.get('/movies', (req, res, next) => {
  Movie.find().populate('cast')
  .then((moviesFromDatabase) => {
    console.log(moviesFromDatabase)
    res.render('movies', {movieList: moviesFromDatabase});
  }) 
  .catch(err => {
    console.log(err); 
  })
});


router.get('/movies', (req, res, next) => {
  Celebrity.find()
  .then((celebsFromDatabase) => {
    res.render('movies', {celeb: celebsFromDatabase});
  }) 
  .catch(err => {
    console.log(err); 
  })
}); 

router.post('/movies', (req, res) => {
  const {title, genre, plot, cast} = req.body; 
  console.log(req.body); 
  Movie.create({
    title: title, 
    genre: genre, 
    plot: plot, 
    cast: cast
  }).then(movie => {
    console.log(`Success, movie ${title} has been added.`); 
    res.redirect('/movies'); 
  }).catch(err => {
    console.log(err); 
  })
}); 




module.exports=router; 