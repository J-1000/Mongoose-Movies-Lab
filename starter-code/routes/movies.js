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
    .then(() => {
      Movie.find().then((movies) => res.render("movies/index", { movies }));
    })
    .catch((err) => console.log(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
  Celebrity.find().then((celebs) =>
    Movie.findById(req.params.id)
      .populate("cast")
      .then((movie) => {
        res.render("movies/edit", { movie, celebs });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  );
});

router.post("/movies/:id", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.updateOne({ _id: req.params.id }, { title, genre, plot, cast })
    .then(() => {
      Movie.find().then((movies) => {
        res.render("movies/index", { movies });
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.render("movies/show", { movie });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      Movie.find().then((movies) => {
        res.render("movies/index", { movies });
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
