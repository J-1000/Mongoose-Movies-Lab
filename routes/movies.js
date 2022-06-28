const router = require("express").Router();
const Movie = require("../models/movie");

router.get("/movies/new", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies", { moviesList: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
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
      res.redirect(`/movies/${createdMovie._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
