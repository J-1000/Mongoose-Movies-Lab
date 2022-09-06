const router = require('express').Router();

const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get('/movies/new', (req, res, next) => {
	Celebrity.find().then((celebrities) => {
		res.render('movies/new', { celebrities });
	});
});

router.post('/movies', (req, res, next) => {
	// console.log(req.body)
	console.log(req.body);
	const { title, genre, plot, cast } = req.body;
	Movie.create({ title, genre, plot, cast })
		.then((createdMovie) => {
			console.log(createdMovie);
			// redirect to '/movies/<id of the Celebritie>
			res.redirect(`/movies`);
		})
		.catch((err) => next(err));
});

router.get('/movies', (req, res, next) => {
	Movie.find()
		.populate('cast')
		.then((movies) => {
			console.log(movies[0].cast[0].name);
			res.render('movies/index', { movies });
		})
		.catch((err) => next(err));
});

router.get('/movies/:id', (req, res, next) => {
	const movieId = req.params.id;
	Movie.findById(movieId)
		.populate('cast')
		.then((movie) => {
			// console.log(movies)
			res.render('movies/show', { movie });
		})
		.catch((err) => next(err));
});

router.get('/movies/:id/edit', (req, res, next) => {
    let options = ''
	Celebrity.find().then((celebrities) => {
		Movie.findById(req.params.id)
			.populate('cast')
			.then((movie) => {
                const castIds = movie.cast.map(celeb => celeb.id)

                celebrities.forEach(celeb =>{
                    if (castIds.includes(celeb.id)) {
                        options += `<option value="${celeb.id}" selected>${celeb.name}</option>`
                    } else {
                        options += `<option value="${celeb.id}">${celeb.name}</option>`
                    }
                })

                console.log(options);
                
				res.render('movies/edit', { movie, celebrities: options });
			})
			.catch((err) => next(err));
	});
});


router.post('/movies/:id/delete', (req, res, next) => {
	Movie.findByIdAndDelete(req.params.id)
		.then(() => {
			res.redirect('/movies')
		})
		.catch(err => next(err))
});


module.exports = router;
