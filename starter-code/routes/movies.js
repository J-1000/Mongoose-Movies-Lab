const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require("../models/Celebrity")

router.get("/movies/add", (req,res) => {
    Celebrity.find().then(celebs => {
        res.render('movies/movieForm',{celebs : celebs})
    }).catch(err => {
        next(err);
    });
})
/* GET celebrities list */
  router.get('/movies', (req, res, next) => {
      Movie.find()
      .populate("celebs")
      .then(mov => {
          res.render('movies/movies', { movies: mov });
        })    
  });
router.post('/movies', (req, res) => {
  const { title, genre, plot, cast} = req.body;

  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast : cast
  }).then(movie => {
    console.log(`Success ${movie} was added to the database`);
    res.redirect("/movies");
  }).catch(err => {
    console.log(err);
    // logs the error to the console
    next(err);
  });
});
//   router.get("/celebrities/:id", (req,res) => {
//   Celebrity.findById(req.params.id)
//     .then(celeb => {
//       res.render('celebrities/celebritie', { celeb: celeb });
//     });
//   })
//   router.post("/celebrities/:id/delete", (req,res) => {
//     Celebrity.findByIdAndRemove(req.params.id)
//       .then(
//         res.redirect("/celebrities")
//       )
//       .catch(err => {
//         next(err);
//       });
//     })
//     router.get('/celebrities/edit/:celebId', (req, res) => {
//         Celebrity.findById(req.params.celebId)
//           .then(celeb =>{
//             res.render('celebrities/edit', { celeb: celeb });
//           });
//       });
//       router.post('/celebrities/:celebId', (req, res) => {
//         const { name, occupation, catchPhrase} = req.body;
//       Celebrity.findByIdAndUpdate(req.params.celebId, {
//         name: name,
//         occupation: occupation,
//         catchPhrase: catchPhrase,
//         }).then(celeb => {
//             res.redirect(`/celebrities/${celeb._id}`);
//         }).catch(err => {
//             next(err);
//         })
//         });
        
module.exports = router;
