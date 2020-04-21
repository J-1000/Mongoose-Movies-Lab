const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.js");
const Celebrity = require("../models/Celebrity.js");

router.get("/movies/new", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesfromDB) => {
      res.render("movies/new", { allCelebrities: celebritiesfromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies", (req, res, next) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then((movie) => {
      console.log("Success movie was created", movie);
      res.redirect("movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/index", { movies });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  const editId = req.params.id;
  console.log("req params", req.params.id);
  Movie.findById(editId)
    .populate("cast")
    .then((movie) => {
      console.log("movie", movie);
      res.render("movies/edit", { movie: movie });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/:id", (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot,
  })
    .then((movie) => {
      console.log("Movie has been updated", movie);
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
