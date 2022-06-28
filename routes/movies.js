const router = require("express").Router();
const Movies = require("../models/Movie");
const Celebrity = require("../models/Celebrity");

router.get("/movies", (req, res, next) => {
  Movies.find()
    .then((moviesFromDB) => {
      // console.log(moviesFromDB);
      res.render("movies/index", { movieList: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/new", (req, res, next) => {
  Celebrity.find()
    .then((celebrityFromDB) => {
      console.log(celebrityFromDB);
      res.render("movies/new", { celebrities: celebrityFromDB });
    })
    .catch((err) => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movies.findById(movieId)
    .populate("cast")
    .then((movieFromDB) => {
      console.log(movieFromDB);
      res.render("movies/show", { movie: movieFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movies.create({
    title,
    genre,
    plot,
    cast,
  })
    .then((createdMovie) => {
      console.log(createdMovie);
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
      res.render("movies/new");
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  const moviesId = req.params.id;
  Movies.findById(moviesId)
    .then((movieFromDB) => {
      console.log(movieFromDB);
      res.render("movies/edit", { movie: movieFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
