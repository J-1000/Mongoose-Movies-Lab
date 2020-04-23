const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');


//Iteration #8: Adding a new movie
router.get('/new', (req, res, next) =>{
    res.render('movies/newmovie');
});

router.post('/', (req, res, next) => {
    console.log('sent')

    const {title, genre, plot, cast} = req.body;
    Movie.create({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }).then(movie => {
        console.log(`Succesfully added ${movie} to database`)
        res.redirect('/'  /* `/movie/${movie._id}` */);
    }).catch(err => {
        console.log(err);
        next(err);
      });

})



module.exports = router;