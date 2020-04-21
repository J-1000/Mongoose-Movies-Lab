const express = require("express");
const router = express.Router();
const Movie = require("../models/movie-model"); // movie-model.js
const Celebrity = require("../models/celebrity-model"); // celebrity-model.js

// Iteration 8 and 9:
router.get("/movies/new", (request, response) => {
  Celebrity.find()
    .then((celebrities) => {
      response.render("movies/new", { celebrities });
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});

router.post("/movies/new", (request, response) => {
  const { title, genre, plot, cast } = request.body; // referring to 'name' attributes in <form> in new.hbs
  const newMovie = new Movie({ title, genre, plot, cast });
  newMovie
    .save()
    .then((movie) => {
      console.log(movie);
      response.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
      response.render("movies/new");
    });
});

// Iteration 10:

router.get("/movies", (request, response, next) => {
  Movie.find()
    .populate("cast")
    .then((movieArray) => {
      console.log(movieArray);
      response.render("movies/index", { movieArray });
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});

// Iteration 11:
router.get("/movies/:movieId/edit", (request, response, next) => {
  Movie.findById(request.params.movieId)
    .then((movieToBeEdited) => {
      console.log(movieToBeEdited);
      response.render("movies/edit", movieToBeEdited);
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});

router.post("/movies/:movieId", (request, response, next) => {
  const { title, genre, plot } = request.body; // see also Iteration 4
  Movie.update(
    { _id: request.params.movieId },
    { $set: { title, genre, plot } },
    { new: true }
  )
    .then((movie) => {
      console.log(movie);
      response.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});

// Iteration 12: Editing cast:
// [tbc]

// Extra - Deleting Movie:
// router.post("/movies/:movieId/delete", (request, response, next) => {
//   Movie.findByIdAndRemove(request.params.movieId)
//     .then((movie) => {
//       console.log(movie);
//       response.redirect("/movies");
//     })
//     .catch((error) => {
//       console.log(error);
//       next();
//     });
// });

// has to be included, otherwise app.use() wouldn't recognize this .js
module.exports = router;
