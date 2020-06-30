const express = require('express');
const Celebrity = require('../models/Celebrity');
const router  = express.Router();
// Call the Celebrity model's find method to retrieve all the celebrities.
// If there's an error, call the route's next function and return the error.
// If there isn't an error, render the celebrities/index view.
// Pass the array of celebrities into the view as a variable.
/* GET home page */

// router.get('/:movieId', (req, res) => {
//     const movieId = req.params.movieId;
//     Movie.findById(movieId).then(movie => {
//       res.render('movieInfo', { movie: movie });
//     }).catch(err => {
//       console.log(err);
//     });
//   });

router.get('/', (req, res) => {
    Celebrity.find().then(celeb => {
        res.render('celebrities/index', { celeb: celeb });
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;
