const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");

router.get("/movies", (req, res) => {
  Movie.find()
    .populate("cast")
    .then((movies) => res.render("movies/index", { movies }));
});

///movies/new	GET	Show a form to create a movie

router.get("/movies/new", (req, res) => {
  Celebrity.find().then((celebs) => res.render("movies/new", { celebs }));
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/show", { movie });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/movies", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((movie) => {
      Movie.find().then((movies) => res.render("movies/index", { movies }));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
