const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");

/* GET home page */
router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((data) => {
      //   res.send(data);
      res.render("movies/index", { movies: data });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/new", (req, res, next) => {
  Celebrity.find()
    .then((data) => {
      res.render("movies/new", { celebrities: data });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((data) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
