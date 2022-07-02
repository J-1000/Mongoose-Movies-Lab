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
  console.log("cast:", cast);
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

router.get("/movies/:id", (req, res, next) => {
  console.log(req.params);
  console.log(req.params.id);
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieFromDB) => {
      console.log(movieFromDB);
      res.render("movies/show", { movie: movieFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((err) => {
      next(er);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((movieFromDB) => {
      console.log(movieFromDB);
      res.render("movies/edit", { movie: movieFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findByIdAndRemove(movieId)
    .then((deletedMovie) => {
      console.log(deletedMovie);
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

///${createdMovie._id}

module.exports = router;
