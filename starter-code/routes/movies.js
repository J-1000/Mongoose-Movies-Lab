const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const Celebrity = require("../models/celebrity");

router.get("/new", (req, res, next) => {
  //res.render("movies/new");
  Celebrity.find()
    .then(allTheCelebritiesFromDB => {
      res.render("movies/new", { celebrities: allTheCelebritiesFromDB });
    })
    .catch(error => {
      console.log("Error while getting the celebrities from the DB: ", error);
    });
});

router.post("/", (req, res, next) => {
  const newMovie = new Movie(req.body);
  newMovie
    .save()
    .then(movie => {
      res.redirect("/movies");
    })
    .catch(error => {
      res.render("movies/new");
      next(error);
    });
});

router.get("/:moviesId/edit", (req, res, next) => {
  Movie.findById(req.params.moviesId)
    .then(theMovie => {
      res.render("movies/edit", { movie: theMovie });
    })
    .catch(error => {
      console.log("Error while retrieving movie details: ", error);
    });
});

router.post("/:moviesId/edit", (req, res, next) => {
    const { title, genre, plot } = req.body;
    console.log(req);
    Movie.update(
      { _id: req.params.moviesId },
      { $set: { title, genre, plot } }
    )
      .then(movie => {
        res.redirect("/movies");
      })
      .catch(error => {
        next(error);
      });
  });

router.get("/", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then(allTheMoviesFromDB => {
      console.log(allTheMoviesFromDB);
      res.render("movies/index", { movies: allTheMoviesFromDB });
    })
    .catch(error => {
      console.log("Error while getting the movies from the DB: ", error);
    });
});

module.exports = router;
