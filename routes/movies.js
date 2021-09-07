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


router.post("/movies/:id", (req, res, next) => {
    const moviesId = req.params.id;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(moviesId, {
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }, {new:true})
        .then(() => {
            res.redirect(`/movies/${moviesId}`);
        }).catch(err => { 
            next(err);
        })
});

router.get("/movies/:id/edit", (req, res, next) => {
    const movieId = req.params.id;
    const castList = [];
    const nonCastList = [];
    Movie.findById(movieId)
        .then(movieFromDB => {
                (async function selected() {
                    const celebrities = await Celebrity.find();
                    for (let cast of movieFromDB.cast) {
                        const celecbrityFromDB = await Celebrity.findById(cast.toString())
                        for (let celebrity of celebrities) {
                            if (celebrity._id.toString() === cast.toString()) {
                                castList.push(celecbrityFromDB)
                            } else {
                                nonCastList.push(celebrity)
                            }
                        }
                    }
                    if (castList.length === movieFromDB.cast.length){
                        res.render("movies/edit", { movie: movieFromDB, casts: castList, nonCasts: nonCastList});
                    }
                    
                })();
            
        }).catch(err => { 
            next(err);
        })
});


module.exports = router;