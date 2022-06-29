const router = require("express").Router();
const Celebrity = require("../models/celebrity");
const Movie = require("../models/movie");

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies", { moviesList: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/add", (req, res, next) => {
  Celebrity.find()
    .then((celebrityFromDB) => {
      console.log(celebrityFromDB);
      res.render("movies/new", { celebrities: celebrityFromDB });
    })
    .catch((err) => next(err));
});

router.post("/movies", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then((createdMovie) => {
      console.log(createdMovie);
      res.redirect(`/movies`);
    })
    .catch((err) => {
      next(err);
    });
});

///${createdMovie._id}

module.exports = router;
