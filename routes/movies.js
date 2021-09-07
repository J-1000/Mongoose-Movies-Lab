const router = require("express").Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

/* GET home page */
router.get("/movies/index", (req, res, next) => {
    Movie.find()
        .then(moviesFromDB => {
            res.render("movies/index", { moviesList: moviesFromDB });
        }).catch(err => { 
            next(err);
        })
});

router.get("/movies/new", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render("movies/new", { celebrities: celebritiesFromDB })
        })
        .catch(err => next(err));
});

router.post('/movies', (req, res, next) => {
	console.log(req.body);
	const { title, genre, plot, cast } = req.body;
	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
        cast: cast
	})
		.then(createdMovie => {
            console.log(createdMovie);
			res.redirect('/movies/index');
		})
		.catch(err => next(err));
});

router.get("/movies/:id", (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId).populate('cast')
        .then(movieFromDB => {
            res.render("movies/show", { movie: movieFromDB });
        }).catch(err => { 
            next(err);
        })
});

router.get("/movies/:id/edit", (req, res, next) => {
    const movieId = req.params.id;
    console.log(movieId)
    Movie.findById(movieId).populate('cast')
        .then(movieFromDB => {
            console.log(movieFromDB)
            res.render("movies/edit", { movie: movieFromDB });
        }).catch(err => { 
            next(err);
        })
});


module.exports = router;